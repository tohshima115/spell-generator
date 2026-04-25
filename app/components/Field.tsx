import type { ReactNode, TextareaHTMLAttributes } from "react";

type FieldProps = {
  hint?: ReactNode;
  /**
   * `true` のとき呪文用の見た目 (大きめのドット文字、金色)。
   * 入力欄/結果欄の両方で使う。
   */
  spellLook?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Field({
  hint,
  spellLook = false,
  className,
  ...textareaProps
}: FieldProps) {
  return (
    <div className="block">
      <textarea
        {...textareaProps}
        className={[
          "border-border w-full resize-y rounded border-2 px-3 py-2 leading-relaxed transition-colors focus:outline-none",
          "focus:border-gold focus:ring-gold/40 focus:ring-2",
          spellLook
            ? "bg-night font-pixel text-cream placeholder:text-cream-dim/40 min-h-[7rem] text-lg tracking-[0.2em]"
            : "bg-night text-cream placeholder:text-cream-dim/55 min-h-[3.5rem] text-sm",
          className ?? "",
        ].join(" ")}
      />
      {hint && (
        <p className="text-cream-dim mt-1 text-[11px] leading-snug">{hint}</p>
      )}
    </div>
  );
}
