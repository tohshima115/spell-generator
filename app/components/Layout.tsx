import type { ReactNode } from "react";
import { Button, Card } from "pixel-retroui";
import { SUPPORT_EMAIL, X_HANDLE, X_PROFILE_URL } from "~/config";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="starfield relative min-h-screen overflow-hidden pb-12">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: "url('/bg.webp')" }}
      />
      <main className="relative z-10 mx-auto max-w-3xl px-4 pt-6 sm:px-6 sm:pt-8">
        <PageHeader />
        <div className="space-y-5">{children}</div>
        <FeatureGrid />
        <SmallNote />
        <DisclaimerCard />
        <Footer />
      </main>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="relative mb-8 text-center">
      <h1 className="m-0">
        <img
          src="/logo.webp"
          alt="復活の呪文ジェネレーター — URLを、呪文に変えて守りましょう。"
          className="mx-auto h-auto w-full max-w-md drop-shadow-[0_2px_0_rgba(0,0,0,0.75)]"
        />
      </h1>
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
        icon: "pixelart-icons-font-notes",
        title: "記録に最適",
        body: "手書きのメモやパソコンのメモ帳にそのまま保存可能。ぱっと見でバレない復活の呪文です。",
      },
      {
        icon: "pixelart-icons-font-arrows-vertical",
        title: "可逆変換",
        body: "同じ呪文から、いつでも元のURLに戻すことができます。（※一文字でも違うと復元不可）",
      },
      {
        icon: "pixelart-icons-font-coin",
        title: "完全無料",
        body: "登録不要・完全無料でずっと使えます。",
      },
    ];
  return (
    <section className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
      {items.map((it) => (
        <Card
          key={it.title}
          bg="#0a0820"
          textColor="#c9bea0"
          borderColor="#52423a"
          shadowColor="#000000"
          className="!m-0 font-pixel"
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
        bg="#0a0820"
        textColor="#c9bea0"
        borderColor="#52423a"
        shadowColor="#000000"
        className="!m-0 font-sans"
      >
        <div className="p-4">
          <p className="font-pixel text-cream mb-2 flex items-center gap-2 text-[13px] tracking-wider font-bold">
            <i className="pixelart-icons-font-book-open text-gold text-lg" aria-hidden />
            ちいさなメモ
          </p>
          <p className="text-cream-dim/90 text-[11px] leading-relaxed">
            このツールは『ドラゴンクエストI』『ドラゴンクエストII』(1986〜87年・エニックス) に登場した「ふっかつのじゅもん」に着想を得たファンメイドのジョークツールです。<br />
            大切な冒険の記録を、あなただけの呪文で守りましょう。
          </p>
        </div>
      </Card>
    </div>
  );
}

function DisclaimerCard() {
  return (
    <div className="mt-4">
      <Card
        bg="#0a0820"
        textColor="#c9bea0"
        borderColor="#52423a"
        shadowColor="#000000"
        className="!m-0 font-sans"
      >
        <div className="p-4">
          <p className="font-pixel text-cream mb-2 flex items-center gap-2 text-[13px] tracking-wider font-bold">
            <i className="pixelart-icons-font-info-box text-gold text-lg" aria-hidden />
            おことわり
          </p>
          <p className="text-cream-dim/90 text-[11px] leading-relaxed">
            本サイトは個人が運営する非公式・非営利のジョークツールであり、株式会社スクウェア・エニックスおよび「ドラゴンクエスト」シリーズの公式とは一切関係ありません。著作権・商標その他の問題のあるご指摘をいただいた場合は、速やかに対応・該当箇所の削除をいたします。下記までご連絡ください。
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              onClick={() =>
                window.open(X_PROFILE_URL, "_blank", "noopener,noreferrer")
              }
              bg="#08111e"
              textColor="#dec292"
              shadow="#0a0820"
              borderColor="#52423a"
              className="!m-0 inline-flex min-w-[200px] items-center justify-center gap-2 px-5 text-xs font-pixel tracking-wider"
            >
              <span
                className="inline-flex h-[28px] shrink-0 items-center justify-center"
                aria-hidden
              >
                <XLogo />
              </span>
              開発者 @{X_HANDLE}
            </Button>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-pixel text-cream-dim hover:text-cream inline-flex items-center gap-2 text-[11px] tracking-wider underline-offset-4 hover:underline"
            >
              <i className="pixelart-icons-font-mail text-gold text-base" aria-hidden />
              {SUPPORT_EMAIL}
            </a>
            <a
              href="https://github.com/tohshima115/spell-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-cream-dim hover:text-cream inline-flex items-center gap-2 text-[11px] tracking-wider underline-offset-4 hover:underline"
            >
              <i className="pixelart-icons-font-github text-gold text-base" aria-hidden />
              tohshima115/spell-generator
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      className="inline-block h-3.5 w-3.5 align-middle"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Footer() {
  return (
    <p className="text-cream-dim/70 mt-6 text-center text-[10px]">
      © 復活の呪文ジェネレーター — すべての変換はあなたのブラウザで行われます
    </p>
  );
}
