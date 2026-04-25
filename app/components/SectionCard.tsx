import type { ReactNode } from "react";
import { Card } from "pixel-retroui";

/**
 * 結果表示用カード。pixel-retroui の Card をベースに、
 * ピクセルアート風の border-image とドット影で見出し付きの枠を作る。
 */
export function SectionCard({
  title,
  icon,
  children,
  trailing,
}: {
  title: string;
  icon: string;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <Card
      bg="#010918"
      textColor="#f3ead0"
      borderColor="#f0c860"
      shadowColor="#000000"
      className="!m-0 font-sans"
    >
      <header className="flex items-center gap-2 px-3 py-2 border-b-2 border-gold/40">
        <i className={`${icon} text-gold text-lg`} aria-hidden />
        <h2 className="font-pixel text-cream flex-1 text-sm tracking-[0.14em]">
          {title}
        </h2>
        {trailing}
      </header>
      <div className="px-3 py-3">{children}</div>
    </Card>
  );
}
