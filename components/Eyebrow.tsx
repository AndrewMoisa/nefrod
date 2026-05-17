type EyebrowProps = {
  children: React.ReactNode;
  dark?: boolean;
};

export default function Eyebrow({ children, dark = false }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] before:h-px before:w-7 before:content-[''] ${
        dark
          ? "text-slatefaint before:bg-slate"
          : "text-slate before:bg-slatelite"
      }`}
    >
      {children}
    </span>
  );
}
