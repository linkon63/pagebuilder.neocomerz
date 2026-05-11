"use client";

import React from "react";

export interface VersionOption {
  value: string;
  label: string;
  description: string;
  preview: React.ReactNode; // SVG skeleton preview
}

interface VersionPickerProps {
  value: string;
  onChange: (value: string) => void;
  options: VersionOption[];
}

export function VersionPicker({ value, onChange, options }: VersionPickerProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
        Layout Version
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`group relative flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all duration-150 ${
                isActive
                  ? "border-blue-500 shadow-md shadow-blue-100"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {/* Skeleton Preview */}
              <div
                className={`w-full h-[72px] flex items-center justify-center transition-colors ${
                  isActive ? "bg-blue-50" : "bg-slate-50 group-hover:bg-slate-100"
                }`}
              >
                <div
                  className={`transition-colors ${
                    isActive ? "text-blue-400" : "text-slate-300 group-hover:text-slate-400"
                  }`}
                >
                  {opt.preview}
                </div>
              </div>

              {/* Label */}
              <div className="px-2.5 py-2 bg-white">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wide ${
                      isActive ? "text-blue-600" : "text-slate-600"
                    }`}
                  >
                    {opt.label}
                  </span>
                  {isActive && (
                    <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2.5 2.5L8 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reusable SVG Skeleton Shapes ────────────────────────────────────────────

const R = ({ x, y, w, h, r = 2 }: { x: number; y: number; w: number; h: number; r?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill="currentColor" />
);

// Hero layouts
export const HeroSkeletons = {
  classic: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={52} r={4} />
      <rect x={0} y={0} width={80} height={52} rx={4} fill="white" fillOpacity={0.15} />
      <R x={20} y={10} w={40} h={6} r={2} />
      <R x={28} y={20} w={24} h={4} r={2} />
      <R x={24} y={30} w={32} h={8} r={4} />
    </svg>
  ),
  urgency: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={8} r={0} />
      <R x={10} y={14} w={60} h={8} r={2} />
      <R x={20} y={26} w={40} h={5} r={2} />
      <R x={25} y={36} w={30} h={8} r={4} />
    </svg>
  ),
  splitPanel: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={36} h={52} r={3} />
      <R x={4} y={6} w={20} h={4} r={2} />
      <R x={4} y={14} w={28} h={3} r={2} />
      <R x={4} y={20} w={24} h={3} r={2} />
      <R x={4} y={30} w={28} h={7} r={3} />
      <R x={40} y={0} w={40} h={52} r={3} />
    </svg>
  ),
  cinematic: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={52} r={4} />
      <R x={15} y={8} w={50} h={10} r={2} />
      <R x={25} y={22} w={30} h={5} r={2} />
      <R x={20} y={32} w={40} h={12} r={4} />
    </svg>
  ),
  organic: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={40} y={0} w={40} h={52} r={3} />
      <R x={0} y={0} w={36} h={52} r={24} />
      <R x={4} y={10} w={24} h={5} r={2} />
      <R x={4} y={19} w={28} h={4} r={2} />
      <R x={4} y={38} w={28} h={8} r={4} />
    </svg>
  ),
  centerCircle: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={52} r={4} />
      <circle cx={40} cy={26} r={16} fill="white" fillOpacity={0.2} />
      <R x={10} y={6} w={60} h={6} r={2} />
      <R x={0} y={40} w={80} h={12} r={0} />
    </svg>
  ),
};

// Features layouts
export const FeaturesSkeletons = {
  v1: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* 2-col: image grid left, list right */}
      <R x={0} y={0} w={36} h={24} r={2} />
      <R x={0} y={27} w={36} h={24} r={2} />
      <R x={40} y={4} w={38} h={3} r={1} />
      <R x={40} y={11} w={30} h={2} r={1} />
      <R x={40} y={17} w={34} h={2} r={1} />
      <R x={40} y={23} w={28} h={2} r={1} />
      <R x={40} y={29} w={32} h={2} r={1} />
      <R x={40} y={40} w={24} h={7} r={3} />
    </svg>
  ),
  v2: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* Bold CTA left, images right */}
      <R x={0} y={0} w={80} h={7} r={0} />
      <R x={2} y={12} w={34} h={5} r={2} />
      <R x={2} y={21} w={28} h={2} r={1} />
      <R x={2} y={26} w={30} h={2} r={1} />
      <R x={2} y={35} w={34} h={12} r={3} />
      <R x={40} y={9} w={18} h={18} r={2} />
      <R x={61} y={9} w={18} h={18} r={2} />
      <R x={40} y={30} w={18} h={18} r={2} />
      <R x={61} y={30} w={18} h={18} r={2} />
    </svg>
  ),
  v3: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* 3-col numbered cards */}
      <R x={20} y={0} w={40} h={5} r={2} />
      <R x={0} y={10} w={24} h={38} r={3} />
      <R x={28} y={10} w={24} h={38} r={3} />
      <R x={56} y={10} w={24} h={38} r={3} />
    </svg>
  ),
  v4: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* Dark theme */}
      <R x={0} y={0} w={80} h={52} r={4} />
      <R x={4} y={6} w={34} h={5} r={2} />
      <R x={4} y={15} w={28} h={2} r={1} />
      <R x={4} y={20} w={30} h={2} r={1} />
      <R x={4} y={30} w={34} h={16} r={3} />
      <R x={42} y={4} w={18} h={20} r={2} />
      <R x={63} y={4} w={14} h={20} r={2} />
      <R x={42} y={28} w={14} h={20} r={2} />
      <R x={60} y={28} w={18} h={20} r={2} />
    </svg>
  ),
  v5: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* Overlapping collage */}
      <R x={0} y={4} w={36} h={30} r={3} />
      <R x={20} y={18} w={28} h={28} r={3} />
      <R x={10} y={10} w={22} h={22} r={3} />
      <R x={44} y={6} w={34} h={4} r={2} />
      <R x={44} y={14} w={28} h={2} r={1} />
      <R x={44} y={19} w={30} h={2} r={1} />
      <R x={44} y={38} w={34} h={10} r={3} />
    </svg>
  ),
};

// DesignAndFit layouts
export const DesignAndFitSkeletons = {
  v1: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* 3 image cards top, 3 detail cards bottom */}
      <R x={0} y={0} w={24} h={28} r={2} />
      <R x={28} y={0} w={24} h={28} r={2} />
      <R x={56} y={0} w={24} h={28} r={2} />
      <R x={0} y={32} w={24} h={18} r={2} />
      <R x={28} y={32} w={24} h={18} r={2} />
      <R x={56} y={32} w={24} h={18} r={2} />
    </svg>
  ),
  v2: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* Split hero + bordered cards */}
      <R x={0} y={0} w={46} h={52} r={3} />
      <R x={50} y={0} w={30} h={16} r={2} />
      <R x={50} y={19} w={30} h={16} r={2} />
      <R x={50} y={38} w={30} h={14} r={2} />
    </svg>
  ),
  v3: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* Scroll strip */}
      <R x={0} y={0} w={80} h={28} r={3} />
      <R x={4} y={32} w={22} h={18} r={2} />
      <R x={30} y={32} w={22} h={18} r={2} />
      <R x={56} y={32} w={22} h={18} r={2} />
    </svg>
  ),
  v4: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* Dark mosaic */}
      <R x={0} y={0} w={80} h={52} r={4} />
      <R x={4} y={4} w={34} h={20} r={2} />
      <R x={42} y={4} w={34} h={20} r={2} />
      <R x={4} y={28} w={22} h={20} r={2} />
      <R x={30} y={28} w={22} h={20} r={2} />
      <R x={56} y={28} w={22} h={20} r={2} />
    </svg>
  ),
  v5: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      {/* Overlapping cards */}
      <R x={0} y={4} w={28} h={44} r={3} />
      <R x={20} y={0} w={28} h={44} r={3} />
      <R x={40} y={4} w={28} h={44} r={3} />
      <R x={60} y={8} w={18} h={36} r={3} />
    </svg>
  ),
};

// Quality layouts
export const QualitySkeletons = {
  v1: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={24} h={28} r={2} />
      <R x={28} y={0} w={24} h={28} r={2} />
      <R x={56} y={0} w={24} h={28} r={2} />
      <R x={0} y={32} w={24} h={18} r={2} />
      <R x={28} y={32} w={24} h={18} r={2} />
      <R x={56} y={32} w={24} h={18} r={2} />
    </svg>
  ),
  v2: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={46} h={52} r={3} />
      <R x={50} y={0} w={30} h={16} r={2} />
      <R x={50} y={19} w={30} h={16} r={2} />
      <R x={50} y={38} w={30} h={14} r={2} />
    </svg>
  ),
  v3: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={8} y={0} w={64} h={6} r={2} />
      <R x={4} y={10} w={4} h={38} r={2} />
      <R x={12} y={10} w={64} h={10} r={2} />
      <R x={12} y={24} w={64} h={10} r={2} />
      <R x={12} y={38} w={64} h={10} r={2} />
    </svg>
  ),
  v4: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={52} r={4} />
      <R x={4} y={4} w={34} h={20} r={2} />
      <R x={42} y={4} w={34} h={20} r={2} />
      <R x={4} y={28} w={22} h={20} r={2} />
      <R x={30} y={28} w={22} h={20} r={2} />
      <R x={56} y={28} w={22} h={20} r={2} />
    </svg>
  ),
  v5: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={4} w={28} h={44} r={3} />
      <R x={20} y={0} w={28} h={44} r={3} />
      <R x={40} y={4} w={28} h={44} r={3} />
    </svg>
  ),
};

// FAQ layouts
export const FAQSkeletons = {
  default: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={15} y={2} w={50} h={6} r={2} />
      <R x={0} y={12} w={80} h={8} r={3} />
      <R x={0} y={23} w={80} h={8} r={3} />
      <R x={0} y={34} w={80} h={8} r={3} />
      <R x={20} y={46} w={40} h={6} r={3} />
    </svg>
  ),
  v1: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={10} y={2} w={60} h={6} r={2} />
      <R x={0} y={12} w={80} h={7} r={3} />
      <R x={0} y={22} w={80} h={7} r={3} />
      <R x={0} y={32} w={80} h={7} r={3} />
      <R x={22} y={44} w={36} h={7} r={3} />
    </svg>
  ),
  v2: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={52} r={4} />
      <R x={10} y={4} w={60} h={6} r={2} />
      <R x={4} y={14} w={72} h={7} r={3} />
      <R x={4} y={24} w={72} h={7} r={3} />
      <R x={4} y={34} w={72} h={7} r={3} />
      <R x={22} y={45} w={36} h={6} r={3} />
    </svg>
  ),
  v3: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={34} h={52} r={3} />
      <R x={4} y={6} w={26} h={5} r={2} />
      <R x={4} y={16} w={22} h={3} r={1} />
      <R x={4} y={22} w={24} h={3} r={1} />
      <R x={4} y={38} w={26} h={8} r={3} />
      <R x={38} y={4} w={40} h={8} r={3} />
      <R x={38} y={16} w={40} h={8} r={3} />
      <R x={38} y={28} w={40} h={8} r={3} />
      <R x={38} y={40} w={40} h={8} r={3} />
    </svg>
  ),
  v4: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={14} r={3} />
      <R x={0} y={18} w={80} h={8} r={3} />
      <R x={0} y={29} w={80} h={8} r={3} />
      <R x={0} y={40} w={80} h={8} r={3} />
    </svg>
  ),
  v5: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={10} y={0} w={60} h={8} r={3} />
      <R x={0} y={12} w={38} h={8} r={3} />
      <R x={42} y={12} w={38} h={8} r={3} />
      <R x={0} y={24} w={38} h={8} r={3} />
      <R x={42} y={24} w={38} h={8} r={3} />
      <R x={20} y={38} w={40} h={10} r={3} />
    </svg>
  ),
};

// SizeChart layouts
export const SizeChartSkeletons = {
  default: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={50} h={6} r={2} />
      <R x={0} y={10} w={50} h={38} r={3} />
      <R x={54} y={10} w={26} h={38} r={3} />
    </svg>
  ),
  v1: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={50} h={6} r={2} />
      <R x={0} y={10} w={50} h={30} r={3} />
      <R x={54} y={10} w={26} h={30} r={3} />
      <R x={0} y={44} w={80} h={8} r={3} />
    </svg>
  ),
  v2: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={10} y={0} w={60} h={6} r={2} />
      <R x={0} y={10} w={80} h={30} r={3} />
      <R x={0} y={44} w={80} h={8} r={3} />
    </svg>
  ),
  v3: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={52} r={4} />
      <R x={4} y={4} w={72} h={6} r={2} />
      <R x={4} y={14} w={72} h={28} r={3} />
      <R x={4} y={46} w={72} h={4} r={2} />
    </svg>
  ),
  v4: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={8} r={2} />
      <R x={0} y={12} w={80} h={32} r={3} />
      <R x={10} y={48} w={60} h={4} r={2} />
    </svg>
  ),
  v5: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={80} h={52} r={4} />
      <R x={4} y={4} w={72} h={6} r={2} />
      <R x={4} y={14} w={34} h={34} r={3} />
      <R x={42} y={14} w={34} h={34} r={3} />
    </svg>
  ),
};

// Gallery layouts
export const GallerySkeletons = {
  grid: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={38} h={38} r={2} />
      <R x={42} y={0} w={18} h={18} r={2} />
      <R x={63} y={0} w={17} h={18} r={2} />
      <R x={42} y={21} w={18} h={17} r={2} />
      <R x={63} y={21} w={17} h={17} r={2} />
      <R x={0} y={42} w={80} h={4} r={2} />
    </svg>
  ),
  grid6: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={25} h={24} r={2} />
      <R x={28} y={0} w={25} h={24} r={2} />
      <R x={56} y={0} w={24} h={24} r={2} />
      <R x={0} y={28} w={25} h={24} r={2} />
      <R x={28} y={28} w={25} h={24} r={2} />
      <R x={56} y={28} w={24} h={24} r={2} />
    </svg>
  ),
  col: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={18} h={52} r={2} />
      <R x={21} y={0} w={18} h={52} r={2} />
      <R x={42} y={0} w={18} h={52} r={2} />
      <R x={63} y={0} w={17} h={52} r={2} />
    </svg>
  ),
};

// Testimonials layouts
export const TestimonialsSkeletons = {
  masonry: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={18} h={28} r={2} />
      <R x={21} y={0} w={18} h={20} r={2} />
      <R x={42} y={0} w={18} h={32} r={2} />
      <R x={63} y={0} w={17} h={22} r={2} />
      <R x={0} y={32} w={18} h={18} r={2} />
      <R x={21} y={24} w={18} h={26} r={2} />
      <R x={42} y={36} w={18} h={14} r={2} />
      <R x={63} y={26} w={17} h={24} r={2} />
    </svg>
  ),
  grid: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={0} y={0} w={25} h={24} r={2} />
      <R x={28} y={0} w={25} h={24} r={2} />
      <R x={56} y={0} w={24} h={24} r={2} />
      <R x={0} y={28} w={25} h={24} r={2} />
      <R x={28} y={28} w={25} h={24} r={2} />
      <R x={56} y={28} w={24} h={24} r={2} />
    </svg>
  ),
  slider: (
    <svg width="80" height="52" viewBox="0 0 80 52" fill="none">
      <R x={4} y={0} w={72} h={40} r={3} />
      <R x={28} y={44} w={8} h={4} r={2} />
      <R x={40} y={44} w={8} h={4} r={2} />
      <R x={52} y={44} w={8} h={4} r={2} />
    </svg>
  ),
};
