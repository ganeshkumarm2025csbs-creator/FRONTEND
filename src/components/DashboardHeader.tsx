import React from 'react';
import { Menu, UploadCloud, CheckCircle2 } from 'lucide-react';

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenUpload: () => void;
  totalDocuments: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenMobileMenu,
  onOpenUpload,
  totalDocuments,
}) => {
  return (
    <header className="mb-8 md:mb-10">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E3E7EC] lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-xl text-[#123B67] hover:bg-white transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-base text-[#123B67]">ParseAnything</span>
        <button
          onClick={onOpenUpload}
          className="p-2 -mr-2 rounded-xl text-[#123B67] hover:bg-white transition-colors cursor-pointer"
          aria-label="Upload document"
        >
          <UploadCloud className="w-5 h-5 text-[#6FA9DC]" />
        </button>
      </div>

      {/* Main Heading Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E7F2FC] text-[#123B67] text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#3AA889]" />
            OCR & LLM Extraction Pipeline Ready
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#123B67] tracking-tight leading-tight">
            Good Morning,
          </h1>
          <p className="mt-1.5 text-base sm:text-lg text-[#687A91] font-normal">
            Upload your documents and let AI do the rest.
          </p>
        </div>

        {/* Quick action buttons / Live status pill */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-[#E3E7EC] text-xs text-[#687A91] font-medium shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#3AA889]" />
            <span>
              <strong className="text-[#123B67] font-semibold">{totalDocuments}</strong> files processed
            </span>
          </div>

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#123B67] text-white hover:bg-[#123B67]/90 active:scale-[0.98] transition-all text-sm font-semibold shadow-sm shadow-[#123B67]/20 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 text-[#6FA9DC]" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>
    </header>
  );
};
