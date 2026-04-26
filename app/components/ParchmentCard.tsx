import type { ReactNode } from "react";

// /public/ribonn.png の実寸 (422×73)。aspect-ratio 算出用。
const RIBBON_NATURAL_WIDTH = 422;
const RIBBON_NATURAL_HEIGHT = 73;

export function ParchmentCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative pt-10">
      {/* Ribbon Header — public/ribonn.png をそのまま背景に使う。
          画像は中央が羊皮紙パネル、両端が茶色の tail という構図のため、
          タイトル文字列は中央パネル内に収まる程度の左右パディングをとる。
          幅は親シートに対して相対指定し、aspect-ratio で画像本来の縦横比を維持。 */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex justify-center drop-shadow-md">
        <div
          className="relative flex items-center justify-center bg-no-repeat bg-center"
          style={{
            backgroundImage: "url(/ribonn.png)",
            backgroundSize: "100% 100%",
            width: "min(85%, 460px)",
            aspectRatio: `${RIBBON_NATURAL_WIDTH} / ${RIBBON_NATURAL_HEIGHT}`,
          }}
        >
          {/* タイトル/アイコン。リボン中央パネル内に収まるよう左右に余白。
              リボン画像は中央パネルが視覚的にわずかに下寄りなので、
              translate-y で文字を少し下げて見た目の中央に揃える。 */}
          <span className="font-pixel text-ink relative z-10 flex translate-y-[2px] items-center justify-center gap-2 px-[10%] text-sm tracking-[0.15em] sm:text-base md:translate-y-[3px] md:text-lg lg:text-xl">
            {icon && <i className={`${icon} text-ink/80 text-base md:text-lg lg:text-xl`} aria-hidden />}
            {title}
          </span>
        </div>
      </div>

      {/* Parchment Sheet */}
      <div className="relative">
        {/* 波打つ縁の背景レイヤー。SVG filter で歪ませることで縁が不規則になる。
            コンテンツ側は別レイヤーなので文字や入力欄は歪まない。 */}
        <div
          aria-hidden
          className="parch-sheet parch-folds absolute inset-0"
          style={{ filter: "url(#parch-wavy) url(#pixelate)" }}
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
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" />
        </filter>

        {/* 羊皮紙背景レイヤー専用のピクセル化。4x4 セルで荒くドット風に。 */}
        <filter id="pixelate" x="0" y="0" width="100%" height="100%">
          <feFlood x="2" y="2" height="1" width="1" />
          <feComposite width="4" height="4" />
          <feTile result="tile" />
          <feComposite in="SourceGraphic" in2="tile" operator="in" />
          <feMorphology operator="dilate" radius="2" />
        </filter>

      </defs>
    </svg>
  );
}
