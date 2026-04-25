/**
 * 「ちいさなメモ」横の暫定マスコット。画像 (docs/UI_Image.png) の
 * 青スライム風キャラを SVG で簡易再現。実画像が用意されたら差し替える。
 */
export function SlimeMascot({ size = 56 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="スライムのマスコット"
      className="shrink-0 drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]"
    >
      <defs>
        <linearGradient id="slimeBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7da8ff" />
          <stop offset="60%" stopColor="#3d6ee0" />
          <stop offset="100%" stopColor="#1f3fa3" />
        </linearGradient>
      </defs>
      {/* 体 */}
      <path
        d="M32 10 C20 10 12 28 12 42 C12 50 18 54 32 54 C46 54 52 50 52 42 C52 28 44 10 32 10 Z"
        fill="url(#slimeBody)"
        stroke="#0e1f5a"
        strokeWidth="2"
      />
      {/* ハイライト */}
      <ellipse cx="24" cy="24" rx="5" ry="3" fill="#cfe1ff" opacity="0.8" />
      {/* 目 */}
      <ellipse cx="25" cy="36" rx="2.5" ry="3" fill="#ffffff" />
      <ellipse cx="39" cy="36" rx="2.5" ry="3" fill="#ffffff" />
      <circle cx="25.5" cy="36.5" r="1.2" fill="#0e1f5a" />
      <circle cx="39.5" cy="36.5" r="1.2" fill="#0e1f5a" />
      {/* 口 */}
      <path
        d="M27 44 Q32 47 37 44"
        stroke="#0e1f5a"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
