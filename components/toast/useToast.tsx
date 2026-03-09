"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
 
export type Toast = { id: string; title?: string; message: string; variant?: "info" | "error" | "success" };
type ToastCtx = { toasts: Toast[]; show: (t: Omit<Toast, "id">) => void; dismiss: (id: string) => void };
 
const Ctx = createContext<ToastCtx | null>(null);
 
export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within <Toaster/>");
  return ctx;
}
 
export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 5000);
  }, []);
  const dismiss = useCallback((id: string) => setToasts((prev) => prev.filter((x) => x.id !== id)), []);
 
  const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);
 
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}