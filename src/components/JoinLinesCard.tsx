import React, { useEffect, useMemo, useState } from "react";
import { InputToolbar } from "./common/InputToolbar";
import { OutputArea } from "./common/OutputArea";
import { StatusFooter } from "./common/StatusFooter";
import { LoadingButton } from "./common/LoadingButton";
import { TextInputArea } from "./TextCleanerCard/TextInputArea";

interface JoinLinesCardProps {
  showToast: (msg: string) => void;
}

const SEPARATORS = [
  { label: "Comma (,)", value: "," },
  { label: "Semicolon (;)", value: ";" },
  { label: "Pipe (|)", value: "|" },
  { label: "Space", value: " " },
  { label: "Tab", value: "\t" },
];

export const JoinLinesCard: React.FC<JoinLinesCardProps> = ({
  showToast,
}) => {
  const [joinInput, setJoinInput] = useState("");
  const [joinOutput, setJoinOutput] = useState("");
  const [separator, setSeparator] = useState(",");
  const [isLoading, setIsLoading] = useState(false);
  const [processedCount, setProcessedCount] = useState<number | null>(null);

  const handleJoin = () => {
    if (!joinInput.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      const lines = joinInput
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

      setJoinOutput(lines.join(separator));
      setProcessedCount(lines.length);

      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "Enter" &&
        document.activeElement?.id === "join-lines-input"
      ) {
        handleJoin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [joinInput, separator]);

  const lineCount = useMemo(
    () => joinInput.split("\n").filter(line => line.trim()).length,
    [joinInput]
  );

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setJoinInput(text);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(joinOutput);
    showToast("✓ Copied joined output!");
  };

  const handleClear = () => {
    setJoinInput("");
    setJoinOutput("");
    setProcessedCount(null);
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Join Multiple Lines
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Combine multiple lines into a single line using your preferred
            separator.
          </p>
        </div>

        <InputToolbar
          lineCount={lineCount}
          onPaste={handlePaste}
          onClear={handleClear}
          disableClear={!joinInput}
        />

        <TextInputArea
          id="join-lines-input"
          value={joinInput}
          onChange={setJoinInput}
          rows={6}
          placeholder={`Example:
PSAU012312421
PSAU012312421
PSAU012312421`}
        />

        <div className="mt-4 flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Separator
          </label>

          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            {SEPARATORS.map(item => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <LoadingButton
          label="Join Lines"
          loading={isLoading}
          disabled={!joinInput}
          onClick={handleJoin}
        />
      </div>

      <OutputArea
        title="Joined Output"
        value={joinOutput}
        onCopy={handleCopy}
      />

      <StatusFooter
        show={processedCount !== null && !!joinInput}
        message={`✓ ${processedCount} lines joined successfully`}
      />
    </section>
  );
};