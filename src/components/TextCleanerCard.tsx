import { StatusFooter } from './common/StatusFooter';
import { LoadingButton } from './common/LoadingButton';
import { InputToolbar } from './common/InputToolbar';
import { OutputArea } from './common/OutputArea';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TextInputArea } from './common/TextInputArea';

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
    <section className="dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
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



        <TextInputArea
          id="text-input-area"
          value={textInput}
          placeholder={`Example: PASU 9099-2012-21`}
          onChange={setTextInput}
          enableDragDrop
          isDragActive={isTextDragActive}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />

        <LoadingButton
          label="Remove Spaces & Dashes"
          loading={isTextLoading}
          disabled={!textInput}
          onClick={handleTextProcess}
        />

        <OutputArea
          title="Cleaned Output"
          value={textOutput}
          onCopy={handleCopy}
        />
      </div>

      <StatusFooter
        show={textProcessedLines !== null && !!textInput}
        message={`✓ ${textProcessedLines} lines processed successfully`}
      />
    </section>
  );
};