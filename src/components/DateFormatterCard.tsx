import { InputToolbar } from './common/InputToolbar';
import React, { useState, useEffect, useMemo } from 'react';
import { Clipboard, Trash2, Check, Loader2 } from 'lucide-react';
import { parseAndFormatDate } from './utils/dateHelpers';
import type { InputDateFormat, OutputDateFormat } from './utils/dateHelpers';


interface DateFormatterCardProps {
  showToast: (msg: string) => void;
}

const INPUT_FORMATS: InputDateFormat[] = [
    'Auto Detect',
    'MMM-DD-YYYY',
    'Month-DD-YYYY',
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD'
];

const INPUT_FORMATS_NO_AUTO = INPUT_FORMATS.filter(
  format => format !== 'Auto Detect'
);

export const DateFormatterCard: React.FC<DateFormatterCardProps> = ({ showToast }) => {
  const [dateInput, setDateInput] = useState('');
  const [dateOutput, setDateOutput] = useState('');
  const [inputFormat, setInputFormat] = useState<InputDateFormat>('Auto Detect');
  const [outputFormat, setOutputFormat] = useState<OutputDateFormat>('MM/DD/YYYY');
  const [isDateLoading, setIsDateLoading] = useState(false);
  const [dateProcessedCount, setDateProcessedCount] = useState<number | null>(null);

  const handleDateProcess = () => {
    if (!dateInput.trim()) return;
    setIsDateLoading(true);
    setTimeout(() => {
      const lines = dateInput.split('\n');
      const processed = lines.map(line => line.trim() ? parseAndFormatDate(line, inputFormat, outputFormat) : '');
      setDateOutput(processed.join('\n'));
      setDateProcessedCount(lines.filter(l => l.trim().length > 0).length);
      setIsDateLoading(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement?.id === 'date-input-area') {
        handleDateProcess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dateInput, inputFormat, outputFormat]);

  const lineCount = useMemo(
    () => dateInput.split('\n').filter(line => line.trim()).length,
    [dateInput]
  );

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setDateInput(text);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(dateOutput);
    showToast("✓ Copied converted dates!");
  };

  const handleClear = () => {
    setDateInput('');
    setDateOutput('');
    setDateProcessedCount(null);
};

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Date Format Converter</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Convert multi-line date values directly into preferred standardized format syntax.
          </p>
        </div>

        <InputToolbar
          lineCount={lineCount}
          onPaste={handlePaste}
          onClear={handleClear}
          disableClear={!dateInput}
        />

        <textarea
          id="date-input-area"
          className="w-full h-24 bg-transparent p-4 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm text-slate-800 dark:text-slate-200 focus:outline-none resize-none"
          placeholder={`Jan-21-2026\nFeb-15-2025`}
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Input Format</label>
            <select className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none" value={inputFormat} onChange={(e) => setInputFormat(e.target.value as InputDateFormat)}>
              {INPUT_FORMATS.map(format => (
                  <option key={format} value={format}>
                      {format}
                  </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Output Format</label>
            <select className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none" value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as OutputDateFormat)}>
              {INPUT_FORMATS_NO_AUTO.map(format => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleDateProcess} disabled={!dateInput || isDateLoading} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2">
          {isDateLoading ? <Loader2 size={16} className="animate-spin" /> : 'Convert Dates'}
        </button>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Formatted Dates</span>
            <button onClick={handleCopy} disabled={!dateOutput} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-medium disabled:opacity-40">
              <Clipboard size={12} /> Copy Result
            </button>
          </div>
          <textarea readOnly className="w-full h-44 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-700 dark:text-slate-300 resize-none" value={dateOutput} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 min-h-[32px] flex items-center">
        {dateProcessedCount !== null && dateInput && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Check size={14} /> ✓ {dateProcessedCount} dates converted successfully
          </p>
        )}
      </div>
    </section>
  );
};