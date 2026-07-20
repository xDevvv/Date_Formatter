import React from 'react';

interface StatusFooterProps {
  show: boolean;
  message: string;
}

export const StatusFooter: React.FC<StatusFooterProps> = ({
  show,
  message,
}) => {
  return (
    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 min-h-[32px] flex items-center">
      {show && (
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          {message}
        </p>
      )}
    </div>
  );
};