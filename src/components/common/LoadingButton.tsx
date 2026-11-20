import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  label: string;
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  label,
  loading,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:text-slate-400 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2
          size={16}
          className="animate-spin"
        />
      ) : (
        label
      )}
    </button>
  );
};