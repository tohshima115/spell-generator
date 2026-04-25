import { useMemo, useState } from "react";
import { listLatestEntries, RAW_URL_TOKEN } from "~/core";

type Group = {
  label: string;
  entries: ReturnType<typeof listLatestEntries>;
};

const GROUPS: { label: string; range: [number, number] }[] = [
  { label: "動画系", range: [0x0001, 0x001f] },
  { label: "同人・商品系", range: [0x0020, 0x002f] },
  { label: "イラスト・AI 系", range: [0x0030, 0x003f] },
  { label: "BL・小説系", range: [0x0040, 0x004f] },
  { label: "VTuber・配信系", range: [0x0050, 0x005f] },
  { label: "SNS", range: [0x0060, 0x006f] },
  { label: "汎用", range: [0x0070, 0xfffe] },
];

/**
 * 「現対応辞書パターンを表示する」エクスパンダ。
 * 呪文表示パネルの下に置く前提。
 */
export function DictionaryList() {
  const [open, setOpen] = useState(false);

  const groups = useMemo<Group[]>(() => {
    const all = listLatestEntries().filter((e) => e.token !== RAW_URL_TOKEN);
    return GROUPS.map(({ label, range: [lo, hi] }) => ({
      label,
      entries: all.filter((e) => e.token >= lo && e.token <= hi),
    })).filter((g) => g.entries.length > 0);
  }, []);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border-amber/50 bg-night text-amber hover:bg-night-2 inline-flex w-full items-center justify-center gap-2 rounded border-2 px-3 py-1.5 text-[11px] font-medium tracking-wider transition-colors"
        aria-expanded={open}
      >
        <i
          className={
            open
              ? "pixelart-icons-font-chevron-up text-base"
              : "pixelart-icons-font-chevron-down text-base"
          }
          aria-hidden
        />
        {open ? "辞書パターンを閉じる" : "現対応辞書パターンを表示する"}
      </button>

      {open && (
        <div className="border-border/60 bg-night mt-2 max-h-72 overflow-y-auto rounded border-2 p-3 text-[11px]">
          <ul className="space-y-3">
            {groups.map((g) => (
              <li key={g.label}>
                <p className="font-pixel text-amber mb-1 text-xs tracking-wider">
                  {g.label}
                </p>
                <ul className="text-cream-dim grid grid-cols-1 gap-x-3 gap-y-0.5 sm:grid-cols-2">
                  {g.entries.map((e) => (
                    <li
                      key={e.token}
                      className="truncate"
                      title={e.prefix}
                    >
                      <span className="text-cream/70 mr-1">
                        {e.note ?? hostnameOf(e.prefix)}
                      </span>
                      <span className="opacity-60">
                        ({hostnameOf(e.prefix)})
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function hostnameOf(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] ?? url;
  }
}
