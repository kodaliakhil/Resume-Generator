"use client";
 
import { useEffect, useState } from "react";
import type { TemplateId } from "@/lib/schemas/form";
import clsx from "clsx";
 
type TemplateMeta = { id: TemplateId; name: string };
 
export function TemplatePicker({
  value,
  onChange,
  error
}: {
  value: TemplateId;
  onChange: (v: TemplateId) => void;
  error?: string;
}) {
  const [items, setItems] = useState<TemplateMeta[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/templates");
        const json = await res.json();
        if (mounted) setItems(json.templates || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
 
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">Template</label>
      {loading ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70">
          Loading templates…
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {items.map((t) => {
            const selected = value === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange(t.id)}
                className={clsx(
                  "rounded-xl border p-3 text-left transition",
                  selected
                    ? "border-accent bg-accent/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                )}
                aria-pressed={selected}
                aria-label={`Choose ${t.name} template`}
              >
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-white/70">{t.id.toUpperCase()}</div>
              </button>
            );
          })}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
}
 