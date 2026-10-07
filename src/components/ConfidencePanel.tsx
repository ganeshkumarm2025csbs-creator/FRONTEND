import React, { useEffect, useState } from 'react';
import { Target, CheckCircle2, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { CONFIDENCE_METRICS } from '../data/mockData';

export const ConfidencePanel: React.FC = () => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Smooth animation for confidence ring and progress bars on open
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(94);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Circular progress calculations
  const size = 160;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * animatedScore) / 100;

  const getColorClass = (val: number) => {
    if (val >= 95) return { bar: 'bg-[#3AA889]', text: 'text-[#3AA889]', badge: 'bg-[#E2F4EC] text-[#3AA889]' };
    if (val >= 90) return { bar: 'bg-[#6FA9DC]', text: 'text-[#123B67]', badge: 'bg-[#E7F2FC] text-[#123B67]' };
    return { bar: 'bg-[#8D82D8]', text: 'text-[#8D82D8]', badge: 'bg-[#EEEAFB] text-[#8D82D8]' };
  };

  return (
    <div className="space-y-6">
      {/* Overall Confidence Visualizer with Circular Ring */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#F8F5EF] to-white border border-[#E3E7EC] flex flex-col items-center text-center shadow-xs">
        <div className="relative w-40 h-40 flex items-center justify-center my-2">
          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            {/* Background track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#E3E7EC"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="opacity-70"
            />
            {/* Animated progress stroke */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#3AA889"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Centered score number & badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-black text-[#123B67] tracking-tight">
              {animatedScore}%
            </span>
            <span className="text-[11px] font-bold text-[#3AA889] uppercase tracking-wider mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              High Precision
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-[#123B67] mt-1">
          Overall Confidence
        </h3>
        <p className="text-xs text-[#687A91] mt-1 max-w-[280px]">
          Confidence represents how certain the AI is about the extracted information.
        </p>

        {/* 3 Metric Summary Callouts */}
        <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-4 border-t border-[#E3E7EC]/80">
          <div className="p-2.5 rounded-xl bg-white border border-[#E3E7EC] text-center">
            <span className="block text-xs sm:text-sm font-extrabold text-[#123B67]">
              5
            </span>
            <span className="text-[10px] text-[#687A91] font-medium leading-tight">
              documents analyzed
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#E3E7EC] text-center">
            <span className="block text-xs sm:text-sm font-extrabold text-[#123B67]">
              127
            </span>
            <span className="text-[10px] text-[#687A91] font-medium leading-tight">
              fields extracted
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#E3E7EC] text-center">
            <span className="block text-xs sm:text-sm font-extrabold text-[#3AA889]">
              94%
            </span>
            <span className="text-[10px] text-[#687A91] font-medium leading-tight">
              average confidence
            </span>
          </div>
        </div>
      </div>

      {/* Extraction Fields Accuracy Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-[#123B67] tracking-tight">
            Extraction Field Confidence
          </h4>
          <span className="text-xs text-[#687A91]">
            6 primary entities
          </span>
        </div>

        <div className="space-y-3">
          {CONFIDENCE_METRICS.map((item) => {
            const colors = getColorClass(item.confidence);
            const isFilled = animatedScore > 0;

            return (
              <div
                key={item.id}
                className="p-3 sm:p-3.5 rounded-2xl border border-[#E3E7EC] bg-white hover:border-[#6FA9DC]/60 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#123B67]">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#687A91] hidden sm:inline">
                      ({item.fieldCount} fields)
                    </span>
                  </div>

                  <span className={`text-xs sm:text-sm font-bold ${colors.text}`}>
                    {item.confidence}%
                  </span>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-[#F8F5EF] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bar}`}
                    style={{
                      width: isFilled ? `${item.confidence}%` : '0%',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confidence Legend Card */}
      <div className="p-3.5 rounded-2xl bg-[#E7F2FC]/50 border border-[#6FA9DC]/30 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#123B67] shrink-0 mt-0.5" />
        <div className="text-xs text-[#123B67]">
          <p className="font-semibold">Automated Threshold Rules:</p>
          <p className="text-[#687A91] mt-0.5 leading-relaxed">
            Fields with confidence &ge; 90% are auto-approved. Fields below 90% (e.g. Document Number at 89%) are routed to the <strong>Review</strong> queue for single-click verification.
          </p>
        </div>
      </div>
    </div>
  );
};
