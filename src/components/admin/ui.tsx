"use client";

import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { Bi } from "@/lib/i18n";

const inputCls =
  "w-full rounded-xl border border-line bg-ink/60 px-3 py-2 text-sm text-cream placeholder:text-sand/40 focus:border-brass focus:outline-none";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-sand/60">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputCls, "resize-none", props.className)} />;
}

/** Bilingual {ar,en} field — two inputs side by side. */
export function BiInput({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: Bi;
  onChange: (v: Bi) => void;
  textarea?: boolean;
}) {
  return (
    <Field label={label}>
      <div className="grid gap-2 sm:grid-cols-2">
        {textarea ? (
          <TextArea dir="rtl" rows={2} placeholder="عربي" value={value.ar} onChange={(e) => onChange({ ...value, ar: e.target.value })} />
        ) : (
          <TextInput dir="rtl" placeholder="عربي" value={value.ar} onChange={(e) => onChange({ ...value, ar: e.target.value })} />
        )}
        {textarea ? (
          <TextArea dir="ltr" rows={2} placeholder="English" value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        ) : (
          <TextInput dir="ltr" placeholder="English" value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        )}
      </div>
    </Field>
  );
}

type BtnVariant = "primary" | "outline" | "danger";
const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-brass text-ink hover:bg-brass-bright",
  outline: "border border-line text-sand hover:border-brass/50 hover:text-cream",
  danger: "border border-clay/40 text-clay-soft hover:bg-clay/10",
};

export function AdminButton({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        btnVariants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-line/70 bg-forest/40 p-5", className)}>{children}</div>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h1 className="font-display text-2xl text-cream">{title}</h1>
      {action}
    </div>
  );
}
