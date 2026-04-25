import { PageLayout } from "~/components/Layout";
import { DecodePanel } from "~/features/decode/DecodePanel";
import { EncodePanel } from "~/features/encode/EncodePanel";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "復活の呪文ジェネレーター" },
    {
      name: "description",
      content: "URL を 64 ひらがなの呪文に可逆変換するツール",
    },
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
