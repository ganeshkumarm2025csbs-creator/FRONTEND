import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  badgeText?: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
  onClick: () => void;
  isActive?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  iconBgColor,
  iconColor,
  badgeText,
  badgeBgColor = 'bg-[#E7F2FC]',
  badgeTextColor = 'text-[#123B67]',
  onClick,
  isActive = false,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative w-full text-left bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FA9DC] ${
        isActive
          ? 'border-[#6FA9DC] shadow-lg shadow-[#6FA9DC]/10 ring-2 ring-[#6FA9DC]/30'
          : 'border-[#E3E7EC] hover:border-[#6FA9DC]/70 hover:shadow-[#6FA9DC]/10'
      }`}
    >
      <div className="flex items-center justify-between gap-4 sm:gap-6">
        {/* Left Section: Icon Container + Texts */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          {/* Large Rounded Icon Container */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${iconBgColor} ${iconColor}`}
          >
            {icon}
          </div>

          {/* Titles & Descriptions */}
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#123B67] tracking-tight group-hover:text-[#123B67] transition-colors">
                {title}
              </h2>
              {badgeText && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeBgColor} ${badgeTextColor}`}
                >
                  {badgeText}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[#687A91] leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Right Section: Arrow Action Indicator */}
        <div className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F8F5EF] group-hover:bg-[#E7F2FC] text-[#687A91] group-hover:text-[#123B67] transition-all duration-300 shadow-2xs">
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
