import { Button } from "pixel-retroui";
import { SHARE_HASHTAGS, SHARE_PREFIXES, SITE_URL } from "~/config";

export function ShareXButton({
  spell,
  className,
}: {
  spell: string;
  className?: string;
}) {
  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!spell) return;
    e.preventDefault();
    const prefix = SHARE_PREFIXES[Math.floor(Math.random() * SHARE_PREFIXES.length)];
    const text = `${prefix}\n\n「${spell}」\n\n${SHARE_HASHTAGS}\n${SITE_URL}`;

    // Android の X アプリは intent URL (x.com/intent/post, twitter.com/intent/tweet
    // どちらも) を Deep Link で奪った後タイムライン/ログイン画面に飛ばす既知バグがある。
    // Web Share API はシステム共有シート経由で X の ACTION_SEND ハンドラを叩くため
    // Deep Link とは別経路で投稿画面が開く。モバイルはこちらを優先する。
    //
    // url フィールドを使うと X 投稿画面の先頭に空行が入る (X アプリ側が url 用の
    // 行を予約している模様) ため、URL は text に含めて単一フィールドで渡す。
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
    if (isMobile && typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        return;
      } catch (err) {
        // ユーザーキャンセルは無視。それ以外は URL フォールバックに進む。
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    // デスクトップ用フォールバック: Web Intent URL を新規タブで開く。
    // `text` と `url` を別パラメータで渡すと半角スペース区切りになるため、
    // 改行で繋ぎたい本文と URL は単一の `text` にまとめて渡す。
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", text);
    const a = document.createElement("a");
    a.href = intent.toString();
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={!spell}
      bg="#08111e"
      textColor="#dec292"
      shadow="#0a0820"
      borderColor="#52423a"
      className={[
        "!m-0 inline-flex w-full max-w-[180px] flex-1 basis-0 items-center justify-center gap-2 px-1 text-sm font-pixel tracking-wider disabled:cursor-not-allowed disabled:opacity-40 sm:px-3",
        className ?? "",
      ].join(" ")}
    >
      <span className="inline-flex h-[36px] shrink-0 items-center justify-center" aria-hidden>
        <XLogo />
      </span>
      Xで共有
    </Button>
  );
}

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      className="inline-block h-4 w-4 align-middle"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
