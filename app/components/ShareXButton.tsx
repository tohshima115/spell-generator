import { Button } from "pixel-retroui";
import { SHARE_HASHTAGS, SHARE_PREFIXES, SITE_URL } from "~/config";

export function ShareXButton({
  spell,
  className,
}: {
  spell: string;
  className?: string;
}) {
  const onClick = () => {
    if (!spell) return;
    // X の intent は `text` と `url` を別パラメータで渡すと半角スペース区切りに
    // なるため、改行で繋ぎたい本文と URL は単一の `text` にまとめて渡す。
    const prefix = SHARE_PREFIXES[Math.floor(Math.random() * SHARE_PREFIXES.length)];
    const text = `${prefix}\n\n「${spell}」\n\n${SHARE_HASHTAGS}\n${SITE_URL}`;
    const intent = new URL("https://x.com/intent/post");
    intent.searchParams.set("text", text);
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
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
