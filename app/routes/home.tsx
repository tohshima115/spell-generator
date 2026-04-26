import { PageLayout } from "~/components/Layout";
import { DecodePanel } from "~/features/decode/DecodePanel";
import { EncodePanel } from "~/features/encode/EncodePanel";
import type { Route } from "./+types/home";

const SITE_URL = "https://spell-generetor.toyoshima.dev";
const SITE_TITLE = "復活の呪文ジェネレーター";
const SITE_DESCRIPTION =
  "URL を 64 ひらがなの呪文に可逆変換するツール。あなただけの「復活の呪文」を生成して、大切な冒険の記録を守りましょう。";
const OGP_IMAGE = `${SITE_URL}/OGP.png`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    { name: "description", content: SITE_DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:title", content: SITE_TITLE },
    { property: "og:description", content: SITE_DESCRIPTION },
    { property: "og:image", content: OGP_IMAGE },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "600" },
    { property: "og:locale", content: "ja_JP" },
    { property: "og:site_name", content: SITE_TITLE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SITE_TITLE },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:image", content: OGP_IMAGE },
  ];
}

export default function Home() {
  return (
    <PageLayout>
      <div className="space-y-5">
        <EncodePanel />
        <DecodePanel />
      </div>
    </PageLayout>
  );
}
