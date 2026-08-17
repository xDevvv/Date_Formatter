import React, { useEffect, useMemo, useState } from 'react';

import { StatusFooter } from './common/StatusFooter';
import { InputToolbar } from './common/InputToolbar';
import { TextInputArea } from './common/TextInputArea';
import { LoadingButton } from './common/LoadingButton';

import {
  parseAndFormatDateTime,
} from './utils/dateHelpers';

import type {
  InputDateFormat,
} from './utils/dateTimeHelpers';
import { OutputArea } from './common/OutputArea';

interface DateTimeFormatterCardProps {
  showToast: (msg: string) => void;
}

const INPUT_FORMATS: InputDateFormat[] = [
  'Auto Detect',
  'MMM-DD-YYYY',
  'Month-DD-YYYY',
  'MM/DD/YYYY',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
];

const OUTPUT_FORMATS = [
  'M/D/YY',
  'MM/DD/YYYY',
  'YYYY-MM-DD',
  'DD-MMM-YYYY',
  'Month DD, YYYY',
] as const;

type OutputDateTimeFormat = typeof OUTPUT_FORMATS[number];

export const DateFormatterCard: React.FC<DateTimeFormatterCardProps> = ({
  showToast,
}) => {
  const [dateInput, setDateInput] = useState('');
  const [dateOutput, setDateOutput] = useState('');

  const [inputFormat, setInputFormat] =
    useState<InputDateFormat>('Auto Detect');

  const [outputFormat, setOutputFormat] =
    useState<OutputDateTimeFormat>('MM/DD/YYYY');

  const [isDateLoading, setIsDateLoading] = useState(false);
  const [dateProcessedCount, setDateProcessedCount] =
    useState<number | null>(null);

  const handleDateProcess = useMemo(() => {
    return () => {
        if (!dateInput.trim()) return;

        setIsDateLoading(true);

        setTimeout(() => {
            const lines = dateInput.split('\n');

            const processed = lines
                .map(line => {
                    if (!line.trim()) {
                        return '';
                    }

                    return parseAndFormatDateTime(
                        line,
                        inputFormat,
                        outputFormat
                    );
                })
                .join('\n');

            setDateOutput(processed);

            setDateProcessedCount(
                lines.filter(line => line.trim()).length
            );

            setDateProcessedCount(lines.length);
            setIsDateLoading(false);
        }, 300);
    };
}, [dateInput, inputFormat, outputFormat]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === 'Enter' &&
        document.activeElement?.id === 'datetime-input-area'
      ) {
        handleDateProcess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDateProcess]);

  const lineCount = useMemo(
    () => dateInput.split('\n').filter(line => line.trim()).length,
    [dateInput]
  );

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setDateInput(text);
  };

  const handleClear = () => {
    setDateInput('');
    setDateOutput('');
    setDateProcessedCount(null);
  };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(dateOutput);
        showToast("✓ Date & time values copied!");
    };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">

      <div>
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Date & Time Formatter
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Convert multi-line date and time values while keeping the date and
            time together.
          </p>
        </div>

        <InputToolbar
          lineCount={lineCount}
          onPaste={handlePaste}
          onClear={handleClear}
          disableClear={!dateInput}
        />

        <TextInputArea
          id="datetime-input-area"
          value={dateInput}
          placeholder="Example: Jan-21-2026 830 PM"
          onChange={setDateInput}
          rows={6}
        />

        <div className="grid grid-cols-2 gap-3 mt-4">

          {/* Input Format */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Input Format
            </label>

            <select
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
              value={inputFormat}
              onChange={e =>
                setInputFormat(e.target.value as InputDateFormat)
              }
            >
              {INPUT_FORMATS.map(format => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          {/* Output Format */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Output Format
            </label>

            <select
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
              value={outputFormat}
              onChange={e =>
                setOutputFormat(
                  e.target.value as OutputDateTimeFormat
                )
              }
            >
              {OUTPUT_FORMATS.map(format => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

        </div>

        <LoadingButton
          label="Convert Date & Time"
          loading={isDateLoading}
          disabled={!dateInput}
          onClick={handleDateProcess}
        />
      </div>

      <div className="mt-6">
        <OutputArea
          title="Formatted Result"
          value={dateOutput}
          onCopy={handleCopy}
        />
      </div>

      <StatusFooter
        show={dateProcessedCount !== null && !!dateInput}
        message={`✓ ${dateProcessedCount} date & time values converted successfully`}
      />

    </section>
  );
};