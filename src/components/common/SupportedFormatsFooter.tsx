import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const SupportedFormatsFooter: React.FC = () => (
  <footer className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

    <div className="flex items-center gap-2 mb-4 text-slate-400">
      <Sparkles size={16} />
      <h3 className="text-s font-bold uppercase tracking-wider">
        Supported Transformations
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-500">

      {/* Combined Date & Time */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
        <span className="font-semibold text-slate-700 block mb-1">
          Combined Date & Time
        </span>

        <div className="space-y-1 font-mono text-[16px]">
          <div className="flex items-center gap-2">
            <span className="w-32 ">
              Jan-21-2026 830 PM
            </span>

            <ArrowRight size={12} className="text-slate-600" />

            <span className="text-blue-600 font-bold">
              01/21/2026 8:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* Flexible Time Detection */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
        <span className="font-semibold text-slate-700 block mb-1">
          Flexible Time Detection
        </span>

        <div className="space-y-1 font-mono text-[16px]">
          <div className="flex items-center gap-2">
            <span className="w-16 ">
              830
            </span>

            <ArrowRight size={12} className="text-slate-600" />

            <span className="text-slate-700">
              8:30 AM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-16 ">
              0830 PM
            </span>

            <ArrowRight size={12} className="text-slate-600" />

            <span className="text-slate-700">
              8:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* Date Format Conversion */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
        <span className="font-semibold text-slate-700 block mb-1">
          Date Format Conversion
        </span>

        <div className="space-y-1 font-mono text-[16px]">
          <div className="flex items-center gap-2">
            <span className="w-28 ">
              Jan-21-2026
            </span>

            <ArrowRight size={12} className="text-slate-600" />

            <span className="text-slate-700">
              01/21/2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-28 ">
              2026-01-21
            </span>

            <ArrowRight size={12} className="text-slate-600" />

            <span className="text-slate-700">
              01/21/2026
            </span>
          </div>
        </div>
      </div>

      {/* Multiple Lines */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
        <span className="font-semibold text-slate-700 block mb-1">
          Multiple Lines
        </span>

        <div className="space-y-1 font-mono text-[16px]">
          <div className="flex items-center gap-2">
            <span className="w-32 ">
              Jan-21-2026 830
            </span>

            <ArrowRight size={12} className="text-slate-600" />

            <span className="text-blue-600 font-bold">
              01/21/2026 8:30 AM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-32">
              Jan-22-2026 1202 PM
            </span>

            <ArrowRight size={12} className="text-slate-600" />

            <span className="text-blue-600 font-bold">
              01/22/2026 12:02 PM
            </span>
          </div>
        </div>
      </div>

    </div>
  </footer>

);