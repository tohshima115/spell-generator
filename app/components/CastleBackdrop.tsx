/**
 * ヘッダー上部に描画する、ピクセル風の城＋山シルエット。
 *
 * 画像 (docs/UI_Image.png) の遠景を参考に、左右の山と中央の城をひとつの SVG にまとめている。
 * 紫の夜空グラデーションと星空の上に重ねる前提。
 */
export function CastleBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-44 sm:h-52"
    >
      {/* 上空のほのかな霞 (淡い紫の発光) */}
      <div
        className="absolute inset-x-0 top-0 h-full"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(120,110,220,0.35) 0%, rgba(80,70,170,0.15) 50%, transparent 80%)",
        }}
      />

      {/* 城＋山の SVG */}
      <svg
        viewBox="0 0 800 220"
        preserveAspectRatio="xMidYEnd slice"
        className="absolute inset-x-0 bottom-0 h-full w-full"
        role="presentation"
      >
        <defs>
          <linearGradient id="mountainFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a1850" />
            <stop offset="100%" stopColor="#0f0d34" />
          </linearGradient>
          <linearGradient id="castleFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#28265f" />
            <stop offset="100%" stopColor="#171545" />
          </linearGradient>
        </defs>

        {/* 奥の山 (左右へ伸びる連山) */}
        <path
          d="M0,220 L0,170 L60,120 L110,150 L170,100 L220,140 L260,110 L320,150 L360,130 L400,160 L440,130 L480,150 L540,110 L590,140 L640,100 L700,150 L760,120 L800,170 L800,220 Z"
          fill="url(#mountainFill)"
          opacity="0.9"
        />

        {/* 手前の山 (シルエット濃いめ) */}
        <path
          d="M0,220 L0,200 L40,170 L90,190 L150,160 L210,185 L260,165 L300,190 L320,180 L320,220 Z"
          fill="#0c0a2c"
        />
        <path
          d="M800,220 L800,200 L760,170 L710,190 L650,160 L590,185 L540,165 L500,190 L480,180 L480,220 Z"
          fill="#0c0a2c"
        />

        {/* 中央の城本体 */}
        <g fill="url(#castleFill)">
          {/* 左塔 */}
          <polygon points="320,200 320,140 326,140 326,128 334,128 334,140 340,140 340,200" />
          {/* 左中塔 */}
          <polygon points="346,200 346,150 360,150 360,200" />
          {/* メインゲート + 本館 */}
          <rect x="362" y="155" width="76" height="45" />
          {/* 中央の高塔 */}
          <polygon points="380,200 380,108 388,108 388,96 412,96 412,108 420,108 420,200" />
          {/* 右中塔 */}
          <rect x="440" y="150" width="14" height="50" />
          {/* 右塔 */}
          <polygon points="460,200 460,140 466,140 466,128 474,128 474,140 480,140 480,200" />
          {/* 城下の壁 */}
          <rect x="305" y="180" width="195" height="20" />
        </g>

        {/* 屋根の三角 (紺色がやや明るい) */}
        <g fill="#3a3680">
          <polygon points="320,140 333,124 340,140" />
          <polygon points="460,140 473,124 480,140" />
          <polygon points="380,108 400,82 420,108" />
        </g>

        {/* 城の窓 (黄色い灯) */}
        <g fill="#f5c43a">
          <rect x="396" y="120" width="3" height="5" />
          <rect x="402" y="120" width="3" height="5" />
          <rect x="396" y="135" width="3" height="5" />
          <rect x="402" y="135" width="3" height="5" />
          <rect x="396" y="150" width="3" height="5" />
          <rect x="402" y="150" width="3" height="5" />
          <rect x="372" y="168" width="3" height="4" />
          <rect x="380" y="168" width="3" height="4" />
          <rect x="388" y="168" width="3" height="4" />
          <rect x="411" y="168" width="3" height="4" />
          <rect x="419" y="168" width="3" height="4" />
          <rect x="427" y="168" width="3" height="4" />
          <rect x="445" y="160" width="3" height="4" />
          <rect x="445" y="172" width="3" height="4" />
          <rect x="328" y="155" width="3" height="4" />
          <rect x="350" y="160" width="3" height="4" />
          <rect x="467" y="155" width="3" height="4" />
        </g>

        {/* 旗ポール先の光 (ほんのり) */}
        <circle cx="400" cy="78" r="2" fill="#f5c43a" opacity="0.9" />

        {/* 木々のシルエット (城の足元) */}
        <g fill="#0a0826">
          <polygon points="295,200 302,184 309,200" />
          <polygon points="312,200 318,188 324,200" />
          <polygon points="492,200 498,188 504,200" />
          <polygon points="506,200 513,184 520,200" />
        </g>
      </svg>
    </div>
  );
}
