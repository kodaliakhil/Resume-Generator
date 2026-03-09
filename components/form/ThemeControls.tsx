"use client";
 
import type { Theme } from "@/lib/schemas/form";
import clsx from "clsx";
 
export function ThemeControls({
  value,
  onChange,
  errors
}: {
  value: Theme;
  onChange: (next: Theme) => void;
  errors?: Partial<Record<keyof Theme, string>>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-1">
        <label htmlFor="theme-accentColor" className="mb-1 block text-sm font-medium">
          Accent color
        </label>
        <input
          id="theme-accentColor"
          type="color"
          value={value.accentColor}
          onChange={(e) => onChange({ ...value, accentColor: e.target.value })}
          className={clsx(
            "h-10 w-16 cursor-pointer rounded-md border border-white/10 bg-white/5 p-0",
            errors?.accentColor && "border-red-500/50"
          )}
          aria-invalid={!!errors?.accentColor}
        />
        {errors?.accentColor && <p className="mt-1 text-sm text-red-300">{errors.accentColor}</p>}
      </div>
 
      <div>
        <label htmlFor="theme-fontSizeScale" className="mb-1 block text-sm font-medium">
          Font size scale
        </label>
        <input
          id="theme-fontSizeScale"
          type="range"
          min={0.85}
          max={1.3}
          step={0.05}
          value={value.fontSizeScale}
          onChange={(e) => onChange({ ...value, fontSizeScale: Number(e.target.value) })}
          className="w-full"
        />
        <div className="text-xs text-white/70">Current: {value.fontSizeScale.toFixed(2)}×</div>
      </div>
 
      <div>
        <label htmlFor="theme-spacingScale" className="mb-1 block text-sm font-medium">
          Spacing scale
        </label>
        <input
          id="theme-spacingScale"
          type="range"
          min={0.85}
          max={1.3}
          step={0.05}
          value={value.spacingScale}
          onChange={(e) => onChange({ ...value, spacingScale: Number(e.target.value) })}
          className="w-full"
        />
        <div className="text-xs text-white/70">Current: {value.spacingScale.toFixed(2)}×</div>
      </div>
 
      <label className="col-span-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value.showIcons}
          onChange={(e) => onChange({ ...value, showIcons: e.target.checked })}
          className="h-4 w-4"
        />
        Show icons (ignored by ATS)
      </label>
 
      <label className="col-span-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value.showPhoto}
          onChange={(e) => onChange({ ...value, showPhoto: e.target.checked })}
          className="h-4 w-4"
        />
        Show photo (not recommended for ATS)
      </label>
    </div>
  );
}
 
 
 
