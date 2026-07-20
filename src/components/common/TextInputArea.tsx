import React from 'react';

interface TextInputAreaProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;

  // Optional drag-and-drop
  enableDragDrop?: boolean;
  isDragActive?: boolean;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: () => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;

  rows?: number;
}

export const TextInputArea: React.FC<TextInputAreaProps> = ({
  id,
  value,
  placeholder,
  onChange,

  enableDragDrop = false,
  isDragActive = false,
  onDragOver,
  onDragLeave,
  onDrop,

  rows = 10,
}) => {
  const textarea = (
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-transparent p-4 font-mono text-sm text-slate-800 dark:text-slate-200 focus:outline-none resize-none"
    />
  );

  if (!enableDragDrop) {
    return (
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl">
        {textarea}
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-xl border-2 transition-all ${
        isDragActive
          ? 'border-blue-500 bg-blue-50/30'
          : 'border-slate-200 dark:border-slate-800'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {textarea}
    </div>
  );
};