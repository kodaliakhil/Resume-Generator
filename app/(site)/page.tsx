"use client";
 
import { useState } from "react";
import { ResumeForm } from "@/components/form/ResumeForm";
import type { ResumeFormData } from "@/lib/schemas/form";
import { PdfPreview } from "@/components/preview/PdfPreview";
 
export default function HomePage() {
  const [current, setCurrent] = useState<ResumeFormData | null>(null);
  const [live, setLive] = useState(false);
 
  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-semibold">ResumeGen</h1>
        <p className="text-white/80">
          Fill the form, pick a template, and generate a LaTeX-powered PDF resume. You can preview inline or download the final PDF.
        </p>
      </section>
 
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ResumeForm
            onChange={(d) => {
              setCurrent(d);
            }}
          />
        </div>
 
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Preview</h2>
          <p className="text-sm text-white/70">
            The inline preview compiles your resume on the server. Enable “Live Preview” to recompile automatically as you edit (debounced).
          </p>
          <PdfPreview data={current as any} live={live} disabled={!current} />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={live}
                onChange={(e) => setLive(e.target.checked)}
              />
              Live Preview (global)
            </label>
            {!live && <span className="text-xs text-white/50">Tip: Click “Refresh Preview” inside the panel.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}