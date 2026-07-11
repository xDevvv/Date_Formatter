import React from 'react';
import { Clipboard } from 'lucide-react';

interface OutputAreaProps {
  title: string;
  value: string;
  onCopy: () => void;
}

export const OutputArea: React.FC<OutputAreaProps> = ({
  title,
  value,
  onCopy,
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {title}
        </span>

        <button
          onClick={onCopy}
          disabled={!value}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-medium disabled:opacity-40"
        >
          <Clipboard size={12} />
          Copy Result
        </button>
      </div>

      <textarea
        readOnly
        value={value}
        className="w-full h-44 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-700 dark:text-slate-300 resize-none"
      />
    </div>
  );
};