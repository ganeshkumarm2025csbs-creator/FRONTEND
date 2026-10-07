import React from 'react';
import { 
  FileText, 
  LayoutDashboard, 
  Files, 
  History, 
  Settings, 
  Sparkles,
  X
} from 'lucide-react';
import { NavTab } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenDocumentsDrawer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
  onOpenDocumentsDrawer
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'documents', label: 'Documents', icon: <Files className="w-5 h-5" />, count: 5 },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
    if (tab === 'documents') {
      onOpenDocumentsDrawer();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#123B67]/30 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 md:w-60 lg:w-[240px] bg-white border-r border-[#E3E7EC] flex flex-col justify-between transition-transform duration-300 ease-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#123B67] to-[#6FA9DC] flex items-center justify-center text-white shadow-sm shadow-[#123B67]/20">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-[#123B67] block leading-none">
                  ParseAnything
                </span>
                <span className="text-[11px] font-medium text-[#687A91] flex items-center gap-1 mt-1">
                  <Sparkles className="w-3 h-3 text-[#6FA9DC]" />
                  AI Document Engine
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#687A91] hover:text-[#123B67] hover:bg-[#F8F5EF] transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1.5">
            {navItems.map((item) => {
              const isSelected = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#E7F2FC] text-[#123B67] shadow-xs'
                      : 'text-[#687A91] hover:text-[#123B67] hover:bg-[#F8F5EF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isSelected ? 'text-[#123B67]' : 'text-[#687A91] group-hover:text-[#123B67]'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isSelected
                          ? 'bg-[#6FA9DC]/20 text-[#123B67]'
                          : 'bg-[#F8F5EF] text-[#687A91]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Banner Card with Wave / Blob Decoration */}
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-[#F8F5EF] to-[#E7F2FC]/70 border border-[#E3E7EC]/80 relative overflow-hidden">
          {/* Subtle Abstract Wave / Blob Graphic */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#6FA9DC]/30 to-[#8D82D8]/25 blur-xl pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#E2F4EC]/60 blur-lg pointer-events-none" />
          
          {/* Abstract SVG waves mimicking reference image */}
          <svg
            className="absolute bottom-0 right-0 w-28 h-16 opacity-35 pointer-events-none text-[#6FA9DC]"
            viewBox="0 0 120 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 45C30 35 45 55 75 42C105 29 110 50 120 48V60H0V45Z"
              fill="currentColor"
            />
            <path
              d="M0 50C25 40 50 58 85 46C110 37 115 54 120 52V60H0V50Z"
              fill="#8D82D8"
              fillOpacity="0.4"
            />
          </svg>

          <div className="relative z-10">
            <div className="w-7 h-7 rounded-lg bg-white/90 shadow-xs flex items-center justify-center mb-2.5 text-[#123B67]">
              <Sparkles className="w-4 h-4 text-[#6FA9DC]" />
            </div>
            <p className="text-xs font-semibold text-[#123B67] leading-relaxed">
              Turn any document
              <br />
              into structured data
              <br />
              with AI.
            </p>
            <div className="mt-2.5 pt-2 border-t border-[#E3E7EC]/60 flex items-center justify-between">
              <span className="text-[10px] text-[#687A91] font-medium">Model v2.4 • Active</span>
              <span className="w-2 h-2 rounded-full bg-[#3AA889] animate-pulse" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
