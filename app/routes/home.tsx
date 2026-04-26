import { OGP_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "~/config";
import { PageLayout } from "~/components/Layout";
import { DecodePanel } from "~/features/decode/DecodePanel";
import { EncodePanel } from "~/features/encode/EncodePanel";
import type { Route } from "./+types/home";

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
