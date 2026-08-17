import React from 'react';
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';

interface DateTimeOutputAreaProps {
  title: string;
  value: string[];
  onCopy: () => void;
}

export const DateTimeOutputArea: React.FC<DateTimeOutputAreaProps> = ({
  title,
  value,
  onCopy,
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {title}
        </h3>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCopy}
          disabled={value.length === 0}
        >
          <Copy size={14} />
          Copy
        </Button>
      </div>

      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 min-h-30">
        {value.length > 0 ? (
          <div className="flex flex-col gap-1">
            {value.map((item, index) => (
              <p
                key={index}
                className="text-xs text-slate-700 dark:text-slate-300 font-mono"
              >
                {item}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-20">
            <p className="text-xs text-slate-400">
              Formatted results will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};