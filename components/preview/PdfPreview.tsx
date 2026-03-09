"use client";
 
import { useEffect, useMemo, useRef, useState } from "react";
import type { ResumeFormData } from "@/lib/schemas/form";
import { useToast } from "@/components/toast/useToast";
import { compileToBlob } from "@/app/lib/api";
import { debounce } from "@/app/lib/debounce";
 
export function PdfPreview({
  data,
  live,
  disabled
}: {
  data: ResumeFormData;
  live: boolean;
  disabled?: boolean;
}) {
  const { show } = useToast();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const revokeRef = useRef<string | null>(null);
 
  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (revokeRef.current) URL.revokeObjectURL(revokeRef.current);
      revokeRef.current = null;
    };
  }, []);
 
  const buildPreview = async () => {
    try {
      setLoading(true);
      const blob = await compileToBlob(data);
      const u = URL.createObjectURL(blob);
      // Revoke old
      if (revokeRef.current) URL.revokeObjectURL(revokeRef.current);
      revokeRef.current = u;
      setUrl(u);
    } catch (err: any) {
      show({ variant: "error", title: "Preview failed", message: err?.message || String(err) });
    } finally {
      setLoading(false);
    }
  };
 
  const debounced = useMemo(() => debounce(buildPreview, 800), [/* deps not including data */]);
 
  // Trigger on demand or live changes
  useEffect(() => {
    if (disabled) return;
    if (live) {
      debounced(); // debounce compile calls on changes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, live, disabled]);
 
  return (
    <div className="h-[75vh] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-white/70">
          {loading ? (
            <span aria-live="polite" aria-busy="true">
              Compiling preview…
            </span>
          ) : url ? (
            <span>Preview ready</span>
          ) : (
            <span>Preview not generated</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
            onClick={buildPreview}
            disabled={disabled || loading}
          >
            {loading ? "Compiling…" : "Refresh Preview"}
          </button>
        </div>
      </div>
      <div className="h-[90%]">
        {url ? (
          <object data={url} type="application/pdf" className="h-full w-full rounded-lg">
            <p className="p-3 text-sm">
              PDF preview not supported by your browser.{" "}
              <a className="underline" href={url} target="_blank" rel="noreferrer">
                Open in new tab
              </a>
              .
            </p>
          </object>
        ) : (
          <div className="flex h-full items-center justify-center text-white/60">
            Fill the form and click “Refresh Preview”.
          </div>
        )}
      </div>
    </div>
  );
}