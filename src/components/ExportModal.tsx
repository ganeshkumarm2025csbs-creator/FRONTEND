import React, { useState } from 'react';
import { X, Check, Copy, Download, FileSpreadsheet, Code2 } from 'lucide-react';
import { ReviewFieldItem } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  fields: ReviewFieldItem[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  fields,
}) => {
  const [format, setFormat] = useState<'json' | 'csv'>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exportData = fields.map((f) => ({
    field: f.fieldName,
    value: f.extractedValue,
    confidence: `${f.confidence}%`,
    status: f.status,
    source: f.documentSource,
  }));

  const jsonString = JSON.stringify(exportData, null, 2);

  const csvString = [
    'Field,Extracted Value,Confidence,Status,Source',
    ...exportData.map(
      (r) => `"${r.field}","${r.value}","${r.confidence}","${r.status}","${r.source}"`
    ),
  ].join('\n');

  const contentToDisplay = format === 'json' ? jsonString : csvString;

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([contentToDisplay], {
      type: format === 'json' ? 'application/json' : 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parseanything_export_${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#123B67]/35 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E3E7EC] overflow-hidden p-6 sm:p-7 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E7EC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E2F4EC] text-[#3AA889] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#123B67]">Export Extracted Data</h3>
              <p className="text-xs text-[#687A91]">{fields.length} validated fields ready for pipeline integration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#687A91] hover:text-[#123B67] hover:bg-[#F8F5EF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 bg-[#F8F5EF] p-1 rounded-xl border border-[#E3E7EC]">
            <button
              onClick={() => setFormat('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                format === 'json'
                  ? 'bg-white text-[#123B67] shadow-2xs'
                  : 'text-[#687A91] hover:text-[#123B67]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              JSON
            </button>
            <button
              onClick={() => setFormat('csv')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                format === 'csv'
                  ? 'bg-white text-[#123B67] shadow-2xs'
                  : 'text-[#687A91] hover:text-[#123B67]'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E3E7EC] bg-white hover:bg-[#F8F5EF] text-[#123B67] text-xs font-semibold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#3AA889]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#123B67] hover:bg-[#123B67]/90 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#6FA9DC]" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="mt-4">
          <pre className="p-4 rounded-2xl bg-[#123B67] text-[#E7F2FC] font-mono text-xs overflow-x-auto max-h-64 leading-relaxed">
            {contentToDisplay}
          </pre>
        </div>
      </div>
    </div>
  );
};
