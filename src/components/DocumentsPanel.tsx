import React, { useState } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  Upload, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentsPanelProps {
  documents: DocumentItem[];
  onOpenUploadModal: () => void;
}

export const DocumentsPanel: React.FC<DocumentsPanelProps> = ({
  documents,
  onOpenUploadModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const totalDocs = documents.length;
  const processedDocs = documents.filter((d) => d.status === 'Processed').length;
  const pendingDocs = documents.filter((d) => d.status === 'Pending' || d.status === 'Processing').length;

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fileFormat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 3 Horizontal Stat Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-3.5">
        <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E3E7EC] flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#687A91] uppercase tracking-wider">
            Total Documents
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#123B67] mt-1.5">
            {totalDocs}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#E2F4EC]/60 border border-[#3AA889]/30 flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#3AA889] uppercase tracking-wider">
            Processed
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#123B67] mt-1.5">
            {processedDocs}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E3E7EC] flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#687A91] uppercase tracking-wider">
            Pending
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#123B67] mt-1.5">
            {pendingDocs}
          </span>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#687A91]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#F8F5EF] border border-[#E3E7EC] text-[#123B67] placeholder-[#687A91] focus:outline-none focus:border-[#6FA9DC] focus:bg-white transition-all"
          />
        </div>

        <button
          onClick={onOpenUploadModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#E7F2FC] text-[#123B67] hover:bg-[#6FA9DC]/20 transition-colors shrink-0 cursor-pointer"
          title="Upload document"
        >
          <Upload className="w-3.5 h-3.5 text-[#6FA9DC]" />
          <span>Upload</span>
        </button>
      </div>

      {/* Processed Documents List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#123B67] tracking-tight">
            Processed Documents
          </h3>
          <span className="text-xs text-[#687A91]">
            {filteredDocs.length} of {documents.length}
          </span>
        </div>

        <div className="space-y-2.5">
          {filteredDocs.map((doc) => {
            const isSelected = selectedDocId === doc.id;
            const isPdf = doc.type === 'pdf';

            return (
              <div
                key={doc.id}
                className="rounded-2xl border border-[#E3E7EC] bg-white transition-all duration-200 hover:border-[#6FA9DC]/70 hover:shadow-md group overflow-hidden"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDocId(isSelected ? null : doc.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedDocId(isSelected ? null : doc.id);
                    }
                  }}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  {/* Left: Icon + File Details */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                        isPdf
                          ? 'bg-[#E7F2FC] text-[#123B67]'
                          : 'bg-[#EEEAFB] text-[#8D82D8]'
                      }`}
                    >
                      {isPdf ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <ImageIcon className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#123B67] truncate group-hover:text-[#123B67]">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-[#687A91] mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span>{doc.fileFormat}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">
                          {doc.date} • {doc.time}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Status Badge & Chevron */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E2F4EC] text-[#3AA889]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{doc.status}</span>
                    </span>

                    <span className="text-[#687A91] group-hover:text-[#123B67] group-hover:translate-x-0.5 transition-all">
                      {isSelected ? (
                        <ChevronDown className="w-4 h-4 text-[#123B67]" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Expanded Extracted Details Drawer inside document item */}
                {isSelected && doc.extractedPreview && (
                  <div className="px-4 pb-4 pt-1 bg-[#F8F5EF]/60 border-t border-[#E3E7EC]/80 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#123B67] uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#6FA9DC]" />
                        Extracted Fields Preview ({doc.fieldsCount} total)
                      </span>
                      <span className="text-[11px] font-semibold text-[#3AA889]">
                        {doc.confidenceScore}% Confidence
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(doc.extractedPreview).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-2 rounded-xl bg-white border border-[#E3E7EC] flex flex-col"
                        >
                          <span className="text-[10px] text-[#687A91] font-medium">
                            {key}
                          </span>
                          <span className="font-semibold text-[#123B67] truncate mt-0.5">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2.5 text-[11px] text-[#687A91] flex items-center justify-between">
                      <span>Ingested: {doc.date} at {doc.time}</span>
                      <span className="text-[#123B67] font-medium">Validation: Clean</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredDocs.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-[#F8F5EF] border border-[#E3E7EC]">
              <FileText className="w-8 h-8 text-[#687A91] mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-[#123B67]">No documents match search</p>
              <p className="text-xs text-[#687A91] mt-1">Try another keyword or upload a new file.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
