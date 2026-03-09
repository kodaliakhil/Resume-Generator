import { spawn } from "child_process";
import path from "path";
import { exists } from "./sandbox";
 
export type TectonicOptions = {
  /** Directory containing main.tex; PDF will be produced here as main.pdf */
  workdir: string;
  /** Timeout in ms (default 15000) */
  timeoutMs?: number;
  /**
   * Optional memory limit in KB (Linux only). We enforce via `bash -lc 'ulimit -v ...; exec tectonic ...'`
   * If not provided, we skip ulimit. For containers, prefer cgroup limits.
   */
  memoryLimitKb?: number;
  /** Run offline-only (default true). Requires bundles cached at build time. */
  offline?: boolean;
  /** Extra tectonic args (advanced) */
  extraArgs?: string[];
  /** For tests: inject a custom runner */
  _customRunner?: (cmd: string, args: string[], cwd: string, timeoutMs: number) => Promise<{ code: number; stdout: string; stderr: string }>;
};
 
export type TectonicResult = {
  code: number;
  stdout: string;
  stderr: string;
  pdfPath?: string;
};
 
export async function runTectonic(opts: TectonicOptions): Promise<TectonicResult> {
  const {
    workdir,
    timeoutMs = 15000,
    memoryLimitKb,
    offline = true,
    extraArgs = [],
    _customRunner
  } = opts;
 
  const args = [
    // Compile main.tex in cwd
    "main.tex",
    // Keep logs nearby; we will read stderr/stdout anyway
    "--keep-logs",
    "--synctex=-1", // disable synctex to speed up
    "--print",      // print logs to stdout
    "--outdir", "."
  ];
 
  if (offline) {
    // Tectonic supports offline behavior when bundles are pre-baked.
    // `--only-cached` prevents network access at runtime.
    args.push("--only-cached");
  }
 
  if (extraArgs.length) args.push(...extraArgs);
 
  const runner = _customRunner ?? defaultRunner;
  const cmd = buildCommand(memoryLimitKb);
 
  const { code, stdout, stderr } = await runner(cmd.cmd, [...cmd.args, "tectonic", ...args], workdir, timeoutMs);
 
  const pdfPath = exists(workdir, "main.pdf") ? path.join(workdir, "main.pdf") : undefined;
  return { code, stdout, stderr, pdfPath };
}
 
function buildCommand(memoryLimitKb?: number): { cmd: string; args: string[] } {
  // On Linux, we can enforce a soft virtual memory limit via bash+ulimit.
  if (process.platform === "linux" && memoryLimitKb && memoryLimitKb > 0) {
    const script = `ulimit -v ${memoryLimitKb}; exec "$@"`;
    return { cmd: "bash", args: ["-lc", script, "--"] };
  }
  // Otherwise, call tectonic directly (cross-platform).
  return { cmd: "env", args: [] };
}
 
async function defaultRunner(
  cmd: string,
  args: string[],
  cwd: string,
  timeoutMs: number
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, env: process.env, shell: false });
 
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));
 
    const timer = setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {}
      resolve({ code: -1, stdout, stderr: stderr + "\n[timeout] Killed after " + timeoutMs + "ms" });
    }, timeoutMs);
 
    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({ code: -2, stdout, stderr: String(err) });
    });
 
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? 0, stdout, stderr });
    });
  });
}