import React, { useState } from 'react';
import { UploadCloud, X, FileText, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { DocumentItem } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: DocumentItem) => void;
}

const SAMPLE_DOCS = [
  { name: 'Vendor_Invoice_2025.pdf', size: '1.9 MB', type: 'pdf' as const, fields: 26 },
  { name: 'Passport_Copy.jpg', size: '2.1 MB', type: 'image' as const, fields: 19 },
  { name: 'Bank_Statement_Q1.pdf', size: '3.4 MB', type: 'pdf' as const, fields: 38 },
];

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const simulateProcessing = (name: string, size: string, type: 'pdf' | 'image', fields: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        name,
        type,
        fileFormat: type === 'pdf' ? 'PDF' : 'Image',
        size,
        date: 'Apr 26, 2025',
        time: timeStr,
        status: 'Processed',
        fieldsCount: fields,
        confidenceScore: 94,
        extractedPreview: {
          'Document ID': `PARSED-${Math.floor(1000 + Math.random() * 9000)}`,
          'Status': 'Extracted Successfully',
          'Primary Entity': name.replace(/\.[^/.]+$/, ""),
          'Confidence Rating': 'High (94%)'
        }
      };

      onAddDocument(newDoc);
      setIsProcessing(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => !isProcessing && onClose()}
        className="fixed inset-0 bg-[#123B67]/35 backdrop-blur-xs transition-opacity" 
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E3E7EC] overflow-hidden p-6 sm:p-7 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E7EC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E7F2FC] text-[#123B67] flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-[#6FA9DC]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#123B67]">Upload Document</h3>
              <p className="text-xs text-[#687A91]">AI will automatically extract all structured fields</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-[#687A91] hover:text-[#123B67] hover:bg-[#F8F5EF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Drop Area */}
        <div className="mt-5">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files[0];
              if (file) {
                simulateProcessing(
                  file.name,
                  `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                  file.type.includes('image') ? 'image' : 'pdf',
                  24
                );
              }
            }}
            className={`p-7 rounded-2xl border-2 border-dashed text-center flex flex-col items-center justify-center transition-all ${
              dragActive 
                ? 'border-[#6FA9DC] bg-[#E7F2FC]/40' 
                : 'border-[#E3E7EC] bg-[#F8F5EF]/60 hover:bg-[#E7F2FC]/20'
            }`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center py-4">
                <Loader2 className="w-10 h-10 text-[#6FA9DC] animate-spin mb-3" />
                <span className="text-sm font-bold text-[#123B67]">Processing with AI...</span>
                <span className="text-xs text-[#687A91] mt-1">Extracting layout, entities & confidence metrics</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#E3E7EC] flex items-center justify-center text-[#6FA9DC] mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-[#123B67]">
                  Drag and drop files here, or{' '}
                  <label className="text-[#6FA9DC] hover:underline cursor-pointer">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          simulateProcessing(
                            file.name,
                            `${(file.size / (1024 * 1024) || 1.8).toFixed(1)} MB`,
                            file.type.includes('image') ? 'image' : 'pdf',
                            24
                          );
                        }
                      }}
                    />
                  </label>
                </p>
                <p className="text-xs text-[#687A91] mt-1">
                  Supports PDF, JPG, PNG up to 25 MB
                </p>
              </>
            )}
          </div>
        </div>

        {/* Quick Sample Presets */}
        {!isProcessing && (
          <div className="mt-5">
            <span className="text-xs font-bold text-[#687A91] uppercase tracking-wider block mb-2">
              Or Try A Preset Document:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_DOCS.map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => simulateProcessing(sample.name, sample.size, sample.type, sample.fields)}
                  className="p-2.5 rounded-xl border border-[#E3E7EC] bg-[#F8F5EF] hover:bg-[#E7F2FC] hover:border-[#6FA9DC] text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <FileText className="w-3.5 h-3.5 text-[#6FA9DC]" />
                    <span className="text-xs font-bold text-[#123B67] truncate">
                      {sample.name.split('.')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#687A91] block">
                    {sample.size} • {sample.fields} fields
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
