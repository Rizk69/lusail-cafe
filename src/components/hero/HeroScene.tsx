"use client";

/* ============================================================================
   HeroScene — the persistent 3D hero. A ceramic coffee cup rises + settles,
   then idles forever (slow float, drifting beans, a rotating gilded ring) with
   pointer + scroll parallax. Procedural geometry only — no GLB, no textures
   from the network. Pauses its render loop when scrolled out of view.
============================================================================ */

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Instances, Instance, Environment, Lightformer, AdaptiveDpr, Float } from "@react-three/drei";

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

const BRASS = "#c9a25e";
const BRASS_BRIGHT = "#ecd29a";
const CREAM = "#f4ecda";

type Quality = { beans: number; dpr: [number, number]; mobile: boolean };
function pickQuality(): Quality {
  if (typeof window === "undefined") return { beans: 30, dpr: [1, 1.7], mobile: false };
  const mobile = window.innerWidth < 768;
  return mobile ? { beans: 14, dpr: [1, 1.5], mobile: true } : { beans: 32, dpr: [1, 1.8], mobile: false };
}

/* oval coffee-bean geometry with the characteristic wavy centre seam */
function makeBeanGeometry(): THREE.BufferGeometry {
  const g = new THREE.IcosahedronGeometry(1, 4);
  const p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    v.x *= 0.7;
    v.y *= 1.18;
    v.z *= 0.86;
    const wave = 0.055 * (1 + 0.4 * Math.sin(v.y * 3.4));
    const groove = Math.exp(-(v.x * v.x) / wave);
    v.z -= Math.sign(v.z || 1) * 0.36 * groove * Math.abs(v.z);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/* ---- the cup --------------------------------------------------------------- */
function CoffeeCup({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const enter = easeOutCubic(clamp01(t / 1.9));
    const spin = THREE.MathUtils.lerp(Math.PI * 2.2, 0, easeOutCubic(clamp01(t / 2.3)));
    const sc = scrollRef.current;
    const settled = enter > 0.999;

    g.position.y = THREE.MathUtils.lerp(-3.2, -0.25, enter) + (settled ? Math.sin(t * 0.9) * 0.05 : 0) + sc * 1.5;
    g.scale.setScalar(THREE.MathUtils.lerp(0.2, 1, enter) * (1 - sc * 0.25));
    g.rotation.y = spin + Math.sin(t * 0.3) * 0.18 + sc * 0.5;
    g.rotation.z = Math.sin(t * 0.6) * 0.025 * enter;
    g.rotation.x = -0.06 + Math.sin(t * 0.5) * 0.02 * enter - sc * 0.12;
  });

  const ceramic = (
    <meshPhysicalMaterial
      color="#10291b"
      roughness={0.28}
      metalness={0.1}
      clearcoat={0.9}
      clearcoatRoughness={0.25}
      envMapIntensity={1.1}
    />
  );

  return (
    <group ref={group} position={[0, -3.2, 0]} scale={0.2}>
      {/* body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.96, 0.72, 1.12, 64, 1, false]} />
        {ceramic}
      </mesh>
      {/* inner wall (darker) */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.88, 0.66, 1.04, 64, 1, true]} />
        <meshStandardMaterial color="#0a1c12" roughness={0.5} side={THREE.BackSide} />
      </mesh>
      {/* coffee surface */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.86, 0.86, 0.04, 64]} />
        <meshPhysicalMaterial color="#1c0f07" roughness={0.18} metalness={0.2} clearcoat={1} envMapIntensity={1.3} />
      </mesh>
      {/* brass rim */}
      <mesh position={[0, 0.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.028, 20, 80]} />
        <meshStandardMaterial color={BRASS} metalness={1} roughness={0.25} emissive={BRASS} emissiveIntensity={0.18} envMapIntensity={1.5} />
      </mesh>
      {/* handle */}
      <mesh position={[0.98, 0.0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.34, 0.075, 18, 60, Math.PI * 1.25]} />
        {ceramic}
      </mesh>
      {/* saucer */}
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[1.5, 1.45, 0.07, 64]} />
        {ceramic}
      </mesh>
      <mesh position={[0, -0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.02, 16, 80]} />
        <meshStandardMaterial color={BRASS} metalness={1} roughness={0.3} envMapIntensity={1.3} />
      </mesh>
    </group>
  );
}

/* ---- gilded ring behind the cup -------------------------------------------- */
function GildedRing({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const enter = easeOutCubic(clamp01((t - 0.3) / 2));
    m.rotation.z = t * 0.08;
    m.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.2) * 0.05;
    m.scale.setScalar(enter);
    m.position.y = -0.1 + scrollRef.current * 1.2;
    (m.material as THREE.MeshStandardMaterial).opacity = 0.55 * enter;
  });
  return (
    <mesh ref={ref} position={[0, -0.1, -1.4]}>
      <torusGeometry args={[2.4, 0.022, 24, 160]} />
      <meshStandardMaterial color={BRASS_BRIGHT} metalness={1} roughness={0.2} transparent emissive={BRASS} emissiveIntensity={0.3} />
    </mesh>
  );
}

/* ---- drifting beans -------------------------------------------------------- */
type Seed = { ax: number; az: number; radius: number; phase: number; speed: number; yOff: number; rx: number; ry: number; rz: number; size: number; color: THREE.Color };
const BEAN_COLORS = ["#4a2f1c", "#5d3c22", "#6f4a2b", "#3a2414", "#7a5230", "#52341f"];

function BeanField({ count, scrollRef }: { count: number; scrollRef: React.MutableRefObject<number> }) {
  const refs = useRef<THREE.Object3D[]>([]);
  const beanGeo = useMemo(makeBeanGeometry, []);
  useEffect(() => () => beanGeo.dispose(), [beanGeo]);
  const seeds = useMemo<Seed[]>(() => {
    const rnd = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
    return Array.from({ length: count }, (_, i) => {
      const a = rnd(i + 1), b = rnd(i + 9.7), c = rnd(i + 21.3), d = rnd(i + 41.9);
      return {
        ax: 2.0 + a * 2.8, az: 1.8 + c * 2.6, radius: 1.0 + d * 1.2,
        phase: a * Math.PI * 2, speed: (b - 0.5) * 0.55 + (b > 0.5 ? 0.2 : -0.2),
        yOff: (c - 0.5) * 3.8, rx: (a - 0.5) * 2.0, ry: (b - 0.5) * 2.0, rz: (c - 0.5) * 2.0,
        size: 0.11 + d * 0.12, color: new THREE.Color(BEAN_COLORS[i % BEAN_COLORS.length]),
      };
    });
  }, [count]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const sc = scrollRef.current;
    for (let i = 0; i < seeds.length; i++) {
      const m = refs.current[i], s = seeds[i];
      if (!m) continue;
      const enter = easeOutCubic(clamp01((t - 0.2) / 1.8));
      const ang = s.phase + t * s.speed;
      const rad = s.radius * (0.5 + 0.5 * enter);
      m.position.set(
        Math.cos(ang) * s.ax * rad * 0.5,
        s.yOff * (0.5 + 0.5 * enter) + Math.sin(t * 0.6 + s.phase) * 0.25 + sc * 2.2,
        Math.sin(ang) * s.az * rad * 0.5 - (1 - enter) * 6,
      );
      m.rotation.x += delta * s.rx; m.rotation.y += delta * s.ry; m.rotation.z += delta * s.rz;
      m.scale.setScalar(s.size * enter);
    }
  });

  return (
    <Instances limit={count} range={count}>
      <primitive object={beanGeo} attach="geometry" />
      <meshStandardMaterial roughness={0.52} metalness={0} envMapIntensity={0.7} />
      {seeds.map((s, i) => (
        <Instance key={i} color={s.color} ref={(el: THREE.Object3D | null) => { if (el) refs.current[i] = el; }} />
      ))}
    </Instances>
  );
}

/* ---- camera parallax ------------------------------------------------------- */
function Rig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const sc = scrollRef.current;
    const px = state.pointer.x * 0.35;
    const py = state.pointer.y * 0.24 + sc * 0.8;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, px, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, py, 4, delta);
    camera.lookAt(0, -0.15, 0);
  });
  return null;
}

function Scene({ quality, scrollRef }: { quality: Quality; scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <Rig scrollRef={scrollRef} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color={"#fff0d6"} />
      <pointLight position={[-4, 1.5, -3]} intensity={28} color={BRASS} distance={16} />
      <pointLight position={[3, -2, 4]} intensity={11} color={BRASS_BRIGHT} distance={13} />
      <pointLight position={[0, 3, 2]} intensity={8} color={CREAM} distance={12} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.3} position={[0, 2, 4]} scale={[8, 4, 1]} color="#fff3df" />
        <Lightformer intensity={1.5} position={[-4, 0, -3]} scale={[3, 6, 1]} color={BRASS} />
        <Lightformer intensity={0.9} position={[4, 1, -2]} scale={[3, 4, 1]} color={BRASS_BRIGHT} />
        <Lightformer intensity={0.6} position={[0, -3, 2]} scale={[6, 3, 1]} color="#1d4630" />
      </Environment>
      <GildedRing scrollRef={scrollRef} />
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.35}>
        <CoffeeCup scrollRef={scrollRef} />
      </Float>
      <BeanField count={quality.beans} scrollRef={scrollRef} />
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function HeroScene() {
  const quality = useMemo(pickQuality, []);
  const wrap = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = clamp01(window.scrollY / Math.max(1, window.innerHeight)); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={quality.dpr}
        frameloop={paused ? "never" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 32, near: 0.1, far: 60 }}
        style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
      >
        <Suspense fallback={null}>
          <Scene quality={quality} scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
