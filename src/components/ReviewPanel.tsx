import React, { useState } from 'react';
import { 
  Check, 
  Edit3, 
  CheckCheck, 
  AlertCircle, 
  FileSpreadsheet, 
  RotateCcw,
  Sparkles,
  Save,
  X
} from 'lucide-react';
import { ReviewFieldItem } from '../types';

interface ReviewPanelProps {
  fields: ReviewFieldItem[];
  onUpdateField: (updatedField: ReviewFieldItem) => void;
  onOpenExportModal: () => void;
}

export const ReviewPanel: React.FC<ReviewPanelProps> = ({
  fields,
  onUpdateField,
  onOpenExportModal,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Counters
  const totalFields = 127;
  const needReviewCount = fields.filter((f) => f.status === 'needs_review').length;
  const verifiedCount = totalFields - needReviewCount;

  const handleStartEdit = (item: ReviewFieldItem) => {
    setEditingId(item.id);
    setEditValue(item.extractedValue);
  };

  const handleSaveEdit = (item: ReviewFieldItem) => {
    if (editValue.trim()) {
      onUpdateField({
        ...item,
        extractedValue: editValue.trim(),
        status: 'verified',
        confidence: 100, // Manual human verification elevates confidence to 100%
      });
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleAccept = (item: ReviewFieldItem) => {
    onUpdateField({
      ...item,
      status: 'verified',
    });
  };

  const handleRevert = (item: ReviewFieldItem) => {
    onUpdateField({
      ...item,
      status: 'needs_review',
    });
  };

  return (
    <div className="space-y-6">
      {/* Review Summary Counters */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E3E7EC] flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#687A91] uppercase tracking-wider">
            Total Fields
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#123B67] mt-1.5">
            {totalFields}
          </span>
          <span className="text-[10px] text-[#687A91] mt-0.5">Extracted</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#EEEAFB]/60 border border-[#8D82D8]/30 flex flex-col justify-between transition-colors">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#8D82D8] uppercase tracking-wider">
            Needs Review
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#123B67] mt-1.5">
            {needReviewCount}
          </span>
          <span className="text-[10px] text-[#8D82D8] mt-0.5">Pending check</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#E2F4EC]/60 border border-[#3AA889]/30 flex flex-col justify-between transition-colors">
          <span className="text-[10px] sm:text-[11px] font-bold text-[#3AA889] uppercase tracking-wider">
            Verified
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#123B67] mt-1.5">
            {verifiedCount}
          </span>
          <span className="text-[10px] text-[#3AA889] mt-0.5">Ready to export</span>
        </div>
      </div>

      {/* Review Status Banner */}
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#F8F5EF] border border-[#E3E7EC]">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-[#8D82D8]" />
          <span className="font-semibold text-[#123B67]">
            {needReviewCount > 0
              ? `${needReviewCount} fields require human validation`
              : 'All extracted fields are verified!'}
          </span>
        </div>

        {needReviewCount === 0 && (
          <span className="text-xs font-bold text-[#3AA889] flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5" /> Ready for Export
          </span>
        )}
      </div>

      {/* Fields List */}
      <div className="space-y-3">
        {fields.map((item) => {
          const isEditing = editingId === item.id;
          const isVerified = item.status === 'verified';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all duration-200 ${
                isVerified
                  ? 'bg-white/70 border-[#E2F4EC] shadow-2xs'
                  : 'bg-white border-[#E3E7EC] hover:border-[#8D82D8]/60 shadow-xs'
              }`}
            >
              {/* Header: Field Name & Source + Confidence */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-bold text-[#123B67]">
                    {item.fieldName}
                  </h4>
                  <span className="text-[11px] text-[#687A91]">
                    Source: {item.documentSource}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      item.confidence >= 80
                        ? 'bg-[#E7F2FC] text-[#123B67]'
                        : 'bg-[#EEEAFB] text-[#8D82D8]'
                    }`}
                  >
                    Confidence: {item.confidence}%
                  </span>
                </div>
              </div>

              {/* Body: Extracted Value or Inline Editing */}
              {isEditing ? (
                <div className="my-3 space-y-2">
                  <label className="text-[11px] font-semibold text-[#687A91] block">
                    Edit Extracted Value:
                  </label>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-[#6FA9DC] bg-[#F8F5EF] text-[#123B67] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#6FA9DC]/30 transition-all font-medium"
                    autoFocus
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleSaveEdit(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3AA889] text-white text-xs font-semibold hover:bg-[#3AA889]/90 active:scale-95 transition-all cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save & Verify
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F8F5EF] text-[#687A91] hover:text-[#123B67] text-xs font-medium transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="my-2.5 p-2.5 rounded-xl bg-[#F8F5EF]/80 border border-[#E3E7EC]/70 text-sm font-semibold text-[#123B67]">
                  <span className="text-[10px] font-normal text-[#687A91] block mb-0.5 uppercase tracking-wider">
                    Extracted:
                  </span>
                  “{item.extractedValue}”
                </div>
              )}

              {/* Action Buttons / Verified State */}
              <div className="flex items-center justify-between pt-1 mt-2 border-t border-[#E3E7EC]/50">
                {isVerified ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3AA889] bg-[#E2F4EC] px-3 py-1.5 rounded-xl">
                      <Check className="w-3.5 h-3.5" />
                      ✓ Verified
                    </span>

                    <button
                      onClick={() => handleRevert(item)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#687A91] hover:text-[#123B67] font-medium transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Re-open
                    </button>
                  </div>
                ) : (
                  !isEditing && (
                    <div className="flex items-center gap-2 w-full justify-end">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F5EF] hover:bg-[#E7F2FC] text-[#123B67] text-xs font-semibold border border-[#E3E7EC] hover:border-[#6FA9DC] transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#687A91]" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleAccept(item)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#3AA889] hover:bg-[#3AA889]/90 active:scale-95 text-white text-xs font-semibold shadow-xs shadow-[#3AA889]/20 transition-all cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Accept
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Action Card */}
      <div className="pt-2 sticky bottom-0 bg-white/95 pb-2">
        <button
          onClick={onOpenExportModal}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#123B67] text-white hover:bg-[#123B67]/90 active:scale-[0.99] font-bold text-sm shadow-md shadow-[#123B67]/15 transition-all cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#6FA9DC]" />
          <span>Export Structured Data ({verifiedCount} Verified)</span>
        </button>
      </div>
    </div>
  );
};
