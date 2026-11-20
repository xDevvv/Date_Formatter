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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>

        <button
          onClick={onCopy}
          disabled={!value}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-medium disabled:opacity-40 hover:bg-slate-700 transition-colors"
        >
          <Clipboard size={12} />
          Copy Result
        </button>
      </div>

      <textarea
        readOnly
        value={value}
        className="w-full h-44 bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm text-slate-700 resize-none"
      />
    </div>
  );
};