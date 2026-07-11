import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => (
  <header className="relative flex flex-col items-center text-center mb-12">
    <button 
      onClick={onToggleTheme}
      className="absolute top-0 right-0 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle visual theme"
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
    
    <div className="text-4xl mb-3 animate-pulse">📅</div>
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
      Text & Date Formatter
    </h1>
    <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl">
      Quickly clean text and convert date formats in bulk. Simply paste your data, process it, and copy the results.
    </p>
  </header>
);