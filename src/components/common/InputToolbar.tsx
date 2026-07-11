import React from 'react';
import { Clipboard, Trash2 } from 'lucide-react';

interface InputToolbarProps {
  lineCount: number;
  onPaste: () => void | Promise<void>;
  onClear: () => void;
  disableClear: boolean;
}

export const InputToolbar: React.FC<InputToolbarProps> = ({
  lineCount,
  onPaste,
  onClear,
  disableClear,
}) => {
  return (
    <div className="flex items-center justify-between mb-2 text-xs">
      <div className="flex items-center gap-2">
        <span className="font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Input
        </span>

        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-400">
          Lines: {lineCount}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onPaste}
          className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-600 dark:text-slate-300 transition-all"
        >
          <Clipboard size={12} />
          Paste
        </button>

        <button
          onClick={onClear}
          disabled={disableClear}
          className="flex items-center gap-1 px-2.5 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium transition-all disabled:opacity-45"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>
    </div>
  );
};