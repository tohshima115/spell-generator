/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  // react-router の Vite プラグインは vitest 実行時に外す (テストはルーティング不要)
  plugins:
    mode === "test"
      ? []
      : [cloudflare({ viteEnvironment: { name: "ssr" } }), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  // @cloudflare/vite-plugin と @react-router/dev で SSR 環境の出力先を一致させる。
  // RR のデフォルト (build/server) を Cloudflare 側にも明示しないと、Cloudflare 側が
  // dist/ssr を作って RR がマニフェスト読込時に NOENT になる。
  environments: {
    client: { build: { outDir: "build/client" } },
    ssr: { build: { outDir: "build/server" } },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
}));
