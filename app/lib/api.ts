import type { ResumeFormData } from "@/lib/schemas/form";
 
/** Compile and return PDF as Blob (for inline preview or manual handling). */
export async function compileToBlob(data: ResumeFormData): Promise<Blob> {
  const res = await fetch("/api/compile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
 
  if (!res.ok) {
    let err: any = {};
    try {
      err = await res.json();
    } catch {
      // ignore
    }
    const message = err?.message || `Failed to compile (HTTP ${res.status})`;
    const details = err?.details;
    throw new Error(details ? `${message}\n\n${details}` : message);
  }
 
  return await res.blob();
}
 
/** Compile and directly download PDF (uses browser anchor trick). */
export async function downloadPdf(data: ResumeFormData): Promise<boolean> {
  const blob = await compileToBlob(data);
  const url = URL.createObjectURL(blob);
 
  const name = (data.profile.fullName || "resume").toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const filename = `${name || "resume"}-resume.pdf`;
 
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return true;
}
 
 
// /** Compile and download PDF. Returns true if downloaded, otherwise throws on error. */
// export async function downloadPdf(data: ResumeFormData): Promise<boolean> {
//   const res = await fetch("/api/compile", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
 
//   if (!res.ok) {
//     let err: any = {};
//     try {
//       err = await res.json();
//     } catch {
//       // ignore
//     }
//     const message = err?.message || `Failed to compile (HTTP ${res.status})`;
//     const details = err?.details;
//     throw new Error(details ? `${message}\n\n${details}` : message);
//   }
 
//   const blob = await res.blob();
//   const url = URL.createObjectURL(blob);
 
//   // Content-Disposition filename is not accessible from fetch; derive from profile
//   const name = (data.profile.fullName || "resume").toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
//   const filename = `${name || "resume"}-resume.pdf`;
 
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   a.remove();
//   URL.revokeObjectURL(url);
//   return true;
// }
 