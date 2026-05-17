type IconProps = {
  className?: string;
  size?: number;
};

type MarkProps = IconProps & {
  light?: boolean;
};

export function ArrowUpRight({ className = "", size = 14 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12L12 2M12 2H4M12 2V10"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function ArrowRight({ className = "", size = 14 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ForumMark({
  className = "",
  size = 38,
  light = false,
}: MarkProps) {
  const tile = light ? "#ffffff" : "#102234";
  const ink = light ? "#102234" : "#ffffff";
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      aria-hidden="true"
    >
      <rect width="38" height="38" rx="2" fill={tile} />
      <path
        d="M10 27V11l9 9 9-9v16"
        stroke={ink}
        strokeWidth="1.8"
        strokeLinecap="square"
      />
      <circle cx="10" cy="11" r="2" fill={ink} />
      <circle cx="28" cy="11" r="2" fill={ink} />
    </svg>
  );
}
