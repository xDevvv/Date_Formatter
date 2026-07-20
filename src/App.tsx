import { useState } from 'react';
import { Header } from './components/common/Header';
import { TextCleanerCard } from './components/TextCleanerCard';
import { DateFormatterCard } from './components/DateFormatterCard';
import { SupportedFormatsFooter } from './components/common/SupportedFormatsFooter';
import { JoinLinesCard } from "./components/JoinLinesCard";

export default function App() {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 dark bg-slate-950 text-slate-50 `}>
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-slate-50 dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-sm font-medium">
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TextCleanerCard showToast={showToast} />
          <DateFormatterCard showToast={showToast} />
          <JoinLinesCard showToast={showToast} />
        </div>
        <SupportedFormatsFooter />
      </div>
    </div>
  );
}