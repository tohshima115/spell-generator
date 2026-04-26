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
      <div className="pointer-events-none absolute left-0 right-0 top-2 sm:top-0 z-20 flex justify-center drop-shadow-md">
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

      {/* Parchment Sheet — frame.webp を border-image (9-slice) で適用。
          四隅の装飾は固定サイズで保ち、中央の羊皮紙テクスチャはコンテンツ量に応じて伸縮。 */}
      <div className="parch-frame relative">
        <div className="px-0 py-3 sm:p-4">{children}</div>
      </div>
    </section>
  );
}
