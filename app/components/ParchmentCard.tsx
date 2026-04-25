import type { ReactNode } from "react";

export function ParchmentCard({
  title,
  icon,
  ribbonColor = "blue",
  children,
}: {
  title: string;
  icon?: string;
  ribbonColor?: "blue" | "purple";
  children: ReactNode;
}) {
  const ribbonBg = ribbonColor === "blue" ? "bg-panel-3" : "bg-[#5a3a7b]";
  const ribbonBorder = ribbonColor === "blue" ? "border-border" : "border-[#7a5a9c]";
  const ribbonTail = ribbonColor === "blue" ? "bg-panel-2" : "bg-[#4a2e6b]";

  return (
    <section className="relative pt-6">
      {/* Ribbon Header */}
      <div className="absolute left-0 right-0 top-0 z-20 flex justify-center drop-shadow-md">
        <div className={`relative flex items-center gap-2 border-y-2 px-8 py-2 text-center font-pixel text-lg tracking-[0.15em] text-cream ${ribbonBg} ${ribbonBorder}`}>
          {/* Tails */}
          <div
            className={`absolute top-2 -left-3 -z-10 h-[calc(100%-8px)] w-6 border-y-2 ${ribbonTail} ${ribbonBorder}`}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 30% 50%)" }}
          />
          <div
            className={`absolute top-2 -right-3 -z-10 h-[calc(100%-8px)] w-6 border-y-2 ${ribbonTail} ${ribbonBorder}`}
            style={{ clipPath: "polygon(0 0, 100% 0, 70% 50%, 100% 100%, 0 100%)" }}
          />
          {/* Fold shadow */}
          <div
            className="absolute top-full left-0 h-2 w-3 bg-night"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
          />
          <div
            className="absolute top-full right-0 h-2 w-3 bg-night"
            style={{ clipPath: "polygon(0 0, 0 100%, 100% 0)" }}
          />
          {icon && <i className={`${icon} text-amber text-lg`} aria-hidden />}
          {title}
        </div>
      </div>

      {/* Parchment Sheet */}
      <div className="relative">
        {/* 波打つ縁の背景レイヤー。SVG filter で歪ませることで縁が不規則になる。
            コンテンツ側は別レイヤーなので文字や入力欄は歪まない。 */}
        <div
          aria-hidden
          className="parch-sheet parch-folds absolute inset-0"
          style={{ filter: "url(#parch-wavy)" }}
        />
        {/* コンテンツ */}
        <div className="relative p-5 sm:p-7 text-ink">
          <div className="border border-dashed border-[#b89855]/60 p-3 sm:p-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/** ページに一度だけ埋め込む SVG filter 定義。 */
export function ParchmentFilterDefs() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id="parch-wavy"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>
      </defs>
    </svg>
  );
}
