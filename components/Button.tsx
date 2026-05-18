import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

type Variant = "solid" | "ghost" | "ghost-light" | "white" | "glass";
type Size = "sm" | "md" | "lg";
type ArrowDir = "up-right" | "right";

const base =
  "btn-glass group inline-flex items-center gap-2.5 font-body font-semibold border cursor-pointer select-none transition-[background-color,color,box-shadow,border-color,transform] duration-300 ease-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy active:scale-[0.985] active:duration-75";

const sizes: Record<Size, string> = {
  sm: "rounded-full px-[18px] py-[9px] text-[0.78rem] tracking-[0.03em] gap-1.5",
  md: "rounded-xl px-6 py-[13px] text-[0.86rem]",
  lg: "rounded-xl px-7 py-[16px] text-[0.92rem] justify-center",
};

const variants: Record<Variant, string> = {
  // dark navy — scrolled header / mobile menu (light backgrounds)
  solid:
    "bg-navy text-white border-navyline/50 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1)] hover:bg-navydeep hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.14),0_20px_44px_-12px_rgba(16,34,52,0.65)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]",
  // frosted outline on light backgrounds
  ghost:
    "bg-white/50 text-navy border-navy/20 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] hover:bg-navy hover:text-white hover:border-navy hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.1),0_16px_36px_-10px_rgba(16,34,52,0.4)] active:shadow-none",
  // frosted outline on dark/video backgrounds
  "ghost-light":
    "bg-white/[0.07] text-white border-white/20 backdrop-blur-md shadow-[inset_0_1.5px_0_rgba(255,255,255,0.16)] hover:bg-white/[0.16] hover:border-white/38 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.26),0_14px_32px_-8px_rgba(255,255,255,0.07)]",
  // bright glass on dark/video backgrounds
  white:
    "bg-white/[0.88] text-navy border-white/55 backdrop-blur-sm shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.04)] hover:bg-white hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,1),0_22px_52px_-14px_rgba(11,23,34,0.55)] active:shadow-none",
  // pure liquid glass — transparent header
  glass:
    "bg-white/[0.09] text-white border-white/22 backdrop-blur-md shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.06)] hover:bg-white/[0.18] hover:border-white/42 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.3),0_14px_38px_-8px_rgba(255,255,255,0.09)]",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  withArrow?: boolean;
  arrow?: ArrowDir;
  className?: string;
  disabled?: boolean;
  "aria-busy"?: boolean;
};

export default function Button({
  children,
  variant = "solid",
  size = "md",
  href,
  type = "button",
  withArrow = true,
  arrow = "up-right",
  className = "",
  disabled,
  "aria-busy": ariaBusy,
}: ButtonProps) {
  const disabledCls = disabled
    ? "cursor-not-allowed opacity-60 hover:!shadow-none"
    : "";
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${disabledCls} ${className}`;
  const arrowSize = size === "lg" ? 15 : size === "sm" ? 12 : 14;
  const ArrowGlyph = arrow === "right" ? ArrowRight : ArrowUpRight;
  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowGlyph
          size={arrowSize}
          className={
            arrow === "right"
              ? "transition-transform duration-300 ease-expo group-hover:translate-x-[3px]"
              : ""
          }
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      aria-busy={ariaBusy}
    >
      {inner}
    </button>
  );
}
