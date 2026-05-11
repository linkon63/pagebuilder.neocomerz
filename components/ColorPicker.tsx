"use client";

import React, { useRef, useState, useEffect } from "react";

// ─── Preset palettes ──────────────────────────────────────────────────────────
const PRESETS = [
  // Brand / warm
  "#F36621", "#FBBF24", "#F59E0B", "#EF4444", "#E11D48",
  // Cool
  "#5b21b6", "#7c3aed", "#2563EB", "#0ea5e9", "#0891b2",
  // Nature
  "#10b981", "#16a34a", "#65a30d", "#84cc16",
  // Neutral
  "#27272a", "#3f3f46", "#71717a", "#a1a1aa", "#ffffff",
  // Background tones
  "#fff7ed", "#faf5ff", "#f0f9ff", "#f0fdf4", "#fffbeb",
  "#f3f4f6", "#f8fafc", "#1e293b", "#0f172a", "#111827",
];

interface ColorPickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorPicker({ value = "#F36621", onChange, label }: ColorPickerProps) {
  const [inputVal, setInputVal] = useState(value);
  const nativeRef = useRef<HTMLInputElement>(null);

  // Keep local input in sync when value changes externally
  useEffect(() => {
    setInputVal(value);
  }, [value]);

  const handleHexInput = (raw: string) => {
    setInputVal(raw);
    // Only commit when it looks like a valid hex
    const clean = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(clean)) {
      onChange(clean);
    }
  };

  const handleNativePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
          {label}
        </p>
      )}

      {/* Swatch + hex input row */}
      <div className="flex items-center gap-2">
        {/* Clickable color swatch — opens native color picker */}
        <button
          type="button"
          onClick={() => nativeRef.current?.click()}
          className="w-9 h-9 rounded-lg border-2 border-white shadow-md ring-1 ring-slate-200 flex-shrink-0 transition-transform hover:scale-110 active:scale-95"
          style={{ backgroundColor: value }}
          title="Pick color"
        />
        {/* Hidden native color input */}
        <input
          ref={nativeRef}
          type="color"
          value={value}
          onChange={handleNativePick}
          className="sr-only"
          tabIndex={-1}
        />
        {/* Hex text input */}
        <input
          type="text"
          value={inputVal}
          onChange={(e) => handleHexInput(e.target.value)}
          placeholder="#F36621"
          maxLength={7}
          className="flex-1 px-2.5 py-1.5 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-700"
        />
      </div>

      {/* Preset swatches */}
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((color) => {
          const isActive = value?.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={color}
              type="button"
              onClick={() => { setInputVal(color); onChange(color); }}
              title={color}
              className={`w-5 h-5 rounded-md border transition-transform hover:scale-110 active:scale-95 ${
                isActive
                  ? "ring-2 ring-offset-1 ring-blue-500 border-transparent scale-110"
                  : color === "#ffffff"
                  ? "border-slate-200"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── ColorGroup — renders multiple pickers in a labeled group ─────────────────
interface ColorField {
  key: string;
  label: string;
  value?: string;
  onChange: (v: string) => void;
}

interface ColorGroupProps {
  fields: ColorField[];
}

export function ColorGroup({ fields }: ColorGroupProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
        Colors
      </p>
      {fields.map((f) => (
        <ColorPicker key={f.key} label={f.label} value={f.value} onChange={f.onChange} />
      ))}
    </div>
  );
}
