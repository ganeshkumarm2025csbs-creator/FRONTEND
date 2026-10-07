import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  headerIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  headerIcon,
  children,
}) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#123B67]/25 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[85%] md:w-[65%] lg:w-[42%] xl:w-[39%] bg-white lg:rounded-l-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-[#E3E7EC] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-6 md:p-7 border-b border-[#E3E7EC] flex items-start justify-between gap-4 bg-white/95 sticky top-0 z-10 lg:rounded-tl-3xl">
          <div className="flex items-start gap-3.5 min-w-0">
            {headerIcon && (
              <div className="w-10 h-10 rounded-xl bg-[#E7F2FC] text-[#123B67] flex items-center justify-center shrink-0 mt-0.5">
                {headerIcon}
              </div>
            )}
            <div className="min-w-0">
              <h2
                id="drawer-title"
                className="text-xl md:text-2xl font-bold text-[#123B67] tracking-tight leading-snug"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-xs md:text-sm text-[#687A91] leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Close 'X' Button */}
          <button
            onClick={onClose}
            className="p-2 -mr-1 -mt-1 rounded-xl text-[#687A91] hover:text-[#123B67] hover:bg-[#F8F5EF] active:bg-[#E7F2FC] transition-colors cursor-pointer shrink-0"
            aria-label="Close side panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-6">
          {children}
        </div>
      </aside>
    </>
  );
};
