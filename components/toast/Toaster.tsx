"use client";
import { useToast } from "./useToast";
 
export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 top-2 z-50 mx-auto flex w-full max-w-lg flex-col gap-2 p-2"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="alert"
          className={`pointer-events-auto rounded-xl border p-3 shadow ${
            t.variant === "error"
              ? "border-red-400/40 bg-red-500/10 text-red-100"
              : t.variant === "success"
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
              : "border-white/20 bg-white/10 text-white"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              {t.title && <p className="font-medium">{t.title}</p>}
              <p className="text-sm opacity-90 whitespace-pre-wrap">{t.message}</p>
            </div>
            <button
              className="rounded-md bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
 