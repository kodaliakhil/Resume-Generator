/**
 * Lightweight logger with level gating.
 */
export const logger = {
  info: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "test") console.info("[info]", ...args);
  },
  warn: (...args: unknown[]) => console.warn("[warn]", ...args),
  error: (...args: unknown[]) => console.error("[error]", ...args),
};
