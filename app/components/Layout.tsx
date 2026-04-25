import type { ReactNode } from "react";
import { Card } from "pixel-retroui";
import { CastleBackdrop } from "./CastleBackdrop";
import { ParchmentFilterDefs } from "./ParchmentCard";
import { SlimeMascot } from "./SlimeMascot";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="starfield relative min-h-screen overflow-hidden pb-12">
      <ParchmentFilterDefs />
      <CastleBackdrop />
      <main className="relative mx-auto max-w-3xl px-4 pt-6 sm:px-6 sm:pt-8">
        <PageHeader />
        <div className="space-y-5">{children}</div>
        <FeatureGrid />
        <SmallNote />
        <Footer />
      </main>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="relative mb-8 pt-24 text-center sm:pt-28">
      <a
        href="https://github.com/tohshima115/spell-generator#readme"
        target="_blank"
        rel="noreferrer noopener"
        className="absolute right-0 top-2 inline-flex items-center gap-2 rounded-sm border-2 border-gold bg-night-2 px-3 py-1.5 text-xs font-pixel text-cream transition-colors hover:bg-panel"
      >
        <i className="pixelart-icons-font-book-open text-base text-gold" aria-hidden />
        使い方
      </a>
      <h1
        className="font-spell-title text-3xl tracking-[0.08em] drop-shadow-[0_2px_0_rgba(0,0,0,0.75)] sm:text-[42px]"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f0c860 55%, #d8a838 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        復活の呪文ジェネレーター
      </h1>
      <p className="text-gold mt-3 text-sm sm:text-base font-bold tracking-widest drop-shadow-[0_1px_0_rgba(0,0,0,0.8)]">
        URLを、呪文に変えて守りましょう。
      </p>
    </header>
  );
}

function FeatureGrid() {
  const items: {
    icon: string;
    title: string;
    body: string;
  }[] = [
    {
      icon: "pixelart-icons-font-shield",
      title: "安全・安心",
      body: "すべての処理はあなたのブラウザ内で完結。URLや呪文が外部に送信されることはありません。",
    },
    {
      icon: "pixelart-icons-font-book-open",
      title: "記録に最適",
      body: "ブックマークやObsidian、メモ帳にそのまま保存可能。誰にもバレないあなただけの復活の呪文です。",
    },
    {
      icon: "pixelart-icons-font-arrow-up-down",
      title: "可逆変換",
      body: "同じ呪文から、いつでも元のURLに戻すことができます。（※一文字でも違うと復元不可）",
    },
    {
      icon: "pixelart-icons-font-drop-full",
      title: "完全無料",
      body: "登録不要・完全無料でずっと使えます。あなたの秘密を、しっかり守ります。",
    },
  ];
  return (
    <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((it) => (
        <Card
          key={it.title}
          bg="#1c1a52"
          textColor="#f3ead0"
          borderColor="#f0c860"
          shadowColor="#0a0820"
          className="!m-0 font-sans"
        >
          <div className="flex flex-col items-center h-full p-3 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center">
              <i className={`${it.icon} text-gold text-3xl drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]`} aria-hidden />
            </div>
            <h3 className="font-pixel text-cream text-[13px] tracking-wider mb-2">
              {it.title}
            </h3>
            <p className="text-cream-dim mt-1 text-[10px] leading-relaxed break-words">
              {it.body}
            </p>
          </div>
        </Card>
      ))}
    </section>
  );
}

function SmallNote() {
  return (
    <div className="mt-6">
    <Card
      bg="#1c1a52"
      textColor="#f3ead0"
      borderColor="#f0c860"
      shadowColor="#0a0820"
      className="!m-0 font-sans"
    >
      <div className="flex items-center gap-4 p-4 relative">
        <div className="shrink-0">
          <SlimeMascot size={56} />
        </div>
        <div className="text-cream-dim min-w-0 flex-1 text-xs leading-relaxed">
          <p className="font-pixel text-cream mb-1 text-[13px] tracking-wider font-bold">
            ちいさなメモ
          </p>
          <p>
            このツールはドラクエの「復活の呪文」からインスピレーションを受けています。<br/>
            大切な冒険の記録を、あなただけの呪文で守りましょう。
          </p>
        </div>
        <div className="absolute right-4 bottom-4 opacity-80">
          <i className="pixelart-icons-font-drop-full text-blue-400 text-3xl" aria-hidden />
        </div>
      </div>
    </Card>
    </div>
  );
}

function Footer() {
  return (
    <p className="text-cream-dim/70 mt-6 text-center text-[10px]">
      © 復活の呪文ジェネレーター — すべての変換はあなたのブラウザで行われます
    </p>
  );
}
