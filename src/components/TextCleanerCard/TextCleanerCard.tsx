import { InputToolbar } from '../common/InputToolbar';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Clipboard, Trash2, Check, Loader2 } from 'lucide-react';

interface TextCleanerCardProps {
  showToast: (msg: string) => void;
}

const REMOVE_SPACES_AND_DASHES = /[\s-]/g;

export const TextCleanerCard: React.FC<TextCleanerCardProps> = ({ showToast }) => {
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [isTextDragActive, setIsTextDragActive] = useState(false);


  const textProcessedLines = useMemo(() => {
    if (!textOutput) return null;

    return textOutput
      .split('\n')
      .filter(line => line.trim())
      .length;
  }, [textOutput]);
  
 const handleTextProcess = async () => {
    if (!textInput.trim()) return;

    setIsTextLoading(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const processed = textInput
        .split('\n')
        .map(line => line.replace(REMOVE_SPACES_AND_DASHES, ''))
        .join('\n');

      setTextOutput(processed);
    } finally {
      setIsTextLoading(false);
    }
  };

  const handleClear = useCallback(() => {
    setTextInput('');
    setTextOutput('');
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTextInput(text);
    } catch {
      showToast('Unable to read from clipboard');
    }
  };

  const handleCopy = async () => {
    try {
      if (!textOutput) return;
      await navigator.clipboard.writeText(textOutput);
      showToast('✓ Copied cleaned text to clipboard!');
    } catch {
      showToast('Unable to write to clipboard');
    }
  };

  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement?.id === 'text-input-area') {
        handleTextProcess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [textInput]);

  const lineCount = useMemo(
    () => textInput.split('\n').filter(line => line.trim()).length,
    [textInput]
  );

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsTextDragActive(true);
  };

  const handleDragLeave = () => {
    setIsTextDragActive(false);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsTextDragActive(false);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTextInput(reader.result as string);
    };
    reader.readAsText(file);
  };
  
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Remove Spaces & Dashes</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Remove spaces and hyphens from IDs, document numbers, product codes, and similar raw tracking strings.
          </p>
        </div>

        <InputToolbar
          lineCount={lineCount}
          onPaste={handlePaste}
          onClear={handleClear}
          disableClear={!textInput}
        />

        <div 
          className={`relative rounded-xl border-2 transition-all ${isTextDragActive ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 dark:border-slate-800'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            id="text-input-area"
            className="w-full h-44 bg-transparent p-4 font-mono text-sm text-slate-800 dark:text-slate-200 focus:outline-none resize-none"
            placeholder={`PASU 9099-2012-21\nPASU 1234-5678-90`}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        <button
          onClick={handleTextProcess}
          disabled={!textInput || isTextLoading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
        >
          {isTextLoading ? <Loader2 size={16} className="animate-spin" /> : 'Remove Spaces & Dashes'}
        </button>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Cleaned Output</span>
            <button onClick={handleCopy} disabled={!textOutput} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-medium disabled:opacity-40">
              <Clipboard size={12} /> Copy Result
            </button>
          </div>
          <textarea readOnly className="w-full h-44 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-700 dark:text-slate-300 resize-none" value={textOutput} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 min-h-[32px] flex items-center">
        {textProcessedLines !== null && textInput && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Check size={14} /> ✓ {textProcessedLines} lines processed successfully
          </p>
        )}
      </div>
    </section>
  );
};