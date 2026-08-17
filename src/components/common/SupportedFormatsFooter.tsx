import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SupportedFormatsFooter: React.FC = () => (
  <footer className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">

    <div className="flex items-center gap-2 mb-4 text-slate-400 dark:text-slate-500">
      <Sparkles size={16} />
      <h3 className="text-xs font-bold uppercase tracking-wider">
        Supported Transformations
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-500 dark:text-slate-400">

      {/* Combined Date & Time */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
        <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
          Combined Date & Time
        </span>

        <div className="space-y-1 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-32 opacity-70">
              Jan-21-2026 830 PM
            </span>

            <ArrowRight size={12} className="text-slate-300" />

            <span className="text-blue-600 dark:text-blue-400 font-bold">
              01/21/2026 8:30 PM
            </span>
          </div>
        </div>
      </div>


      {/* Flexible Time Detection */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
        <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
          Flexible Time Detection
        </span>

        <div className="space-y-1 font-mono text-[11px]">

          <div className="flex items-center gap-2">
            <span className="w-16 opacity-70">
              830
            </span>

            <ArrowRight size={12} className="text-slate-300" />

            <span className="text-slate-700 dark:text-slate-300">
              8:30 AM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-16 opacity-70">
              0830 PM
            </span>

            <ArrowRight size={12} className="text-slate-300" />

            <span className="text-slate-700 dark:text-slate-300">
              8:30 PM
            </span>
          </div>

        </div>
      </div>


      {/* Date Format Conversion */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
        <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
          Date Format Conversion
        </span>

        <div className="space-y-1 font-mono text-[11px]">

          <div className="flex items-center gap-2">
            <span className="w-28 opacity-70">
              Jan-21-2026
            </span>

            <ArrowRight size={12} className="text-slate-300" />

            <span className="text-slate-700 dark:text-slate-300">
              01/21/2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-28 opacity-70">
              2026-01-21
            </span>

            <ArrowRight size={12} className="text-slate-300" />

            <span className="text-slate-700 dark:text-slate-300">
              01/21/2026
            </span>
          </div>

        </div>
      </div>


      {/* Multiple Lines */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
        <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
          Multiple Lines
        </span>

        <div className="space-y-1 font-mono text-[11px]">

          <div className="flex items-center gap-2">
            <span className="w-32 opacity-70">
              Jan-21-2026 830
            </span>

            <ArrowRight size={12} className="text-slate-300" />

            <span className="text-blue-600 dark:text-blue-400 font-bold">
              01/21/2026 8:30 AM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-32 opacity-70">
              Jan-22-2026 1202 PM
            </span>

            <ArrowRight size={12} className="text-slate-300" />

            <span className="text-blue-600 dark:text-blue-400 font-bold">
              01/22/2026 12:02 PM
            </span>
          </div>

        </div>
      </div>

    </div>
  </footer>
);