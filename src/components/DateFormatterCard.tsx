import { StatusFooter } from './common/StatusFooter';
import { InputToolbar } from './common/InputToolbar';
import React, { useState, useEffect, useMemo } from 'react';
import { TextInputArea } from './TextCleanerCard/TextInputArea';
import { parseAndFormatDate } from './utils/dateHelpers';
import type { InputDateFormat, OutputDateFormat } from './utils/dateHelpers';
import { OutputArea } from './common/OutputArea';
import { LoadingButton } from './common/LoadingButton';


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

        <TextInputArea
            id="date-input-area"
            value={dateInput}
            placeholder={`Example: Jan-21-2026 1212`}
            onChange={setDateInput}
            rows={6}
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

        <LoadingButton
          label="Convert Dates"
          loading={isDateLoading}
          disabled={!dateInput}
          onClick={handleDateProcess}
        />
      </div>
      
      <OutputArea
        title="Formatted Dates"
        value={dateOutput}
        onCopy={handleCopy}
      />

      <StatusFooter
        show={dateProcessedCount !== null && !!dateInput}
        message={`✓ ${dateProcessedCount} dates converted successfully`}
      />
    </section>
  );
};