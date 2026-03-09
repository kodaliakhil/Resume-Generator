"use client";
 
import { useEffect, useMemo } from "react";
import type { FieldErrors } from "react-hook-form";
import type { ResumeFormData } from "@/lib/schemas/form";
 
type Props = {
  errors: FieldErrors<ResumeFormData>;
};
 
/**
* Displays a top-level error summary with anchors for quick navigation.
* Accessibility:
* - role="alert" and aria-live="assertive" to announce updates.
* - Links jump to first field of section.
*/
export function ErrorSummary({ errors }: Props) {
  const entries = useMemo(() => {
    const list: { section: string; message: string; href?: string }[] = [];
 
    const push = (section: string, message: string, href?: string) =>
      list.push({ section, message, href });
 
    if (errors.profile) {
      if (errors.profile.fullName?.message) push("Profile", String(errors.profile.fullName.message), "#profile-fullName");
      if (errors.profile.title?.message) push("Profile", String(errors.profile.title.message), "#profile-title");
      if (errors.profile.email?.message) push("Profile", String(errors.profile.email.message), "#profile-email");
    }
    if (errors.experience && Array.isArray(errors.experience)) {
      errors.experience.forEach((e, i) => {
        if (!e) return;
        if (e.company?.message) push("Experience", `Item ${i + 1}: ${String(e.company.message)}`, `#experience-${i}-company`);
        if (e.role?.message) push("Experience", `Item ${i + 1}: ${String(e.role.message)}`, `#experience-${i}-role`);
        if (e.startDate?.message) push("Experience", `Item ${i + 1}: ${String(e.startDate.message)}`, `#experience-${i}-startDate`);
        if (e.endDate?.message) push("Experience", `Item ${i + 1}: ${String(e.endDate.message)}`, `#experience-${i}-endDate`);
      });
    }
    if (errors.education && Array.isArray(errors.education)) {
      errors.education.forEach((e, i) => {
        if (!e) return;
        if (e.school?.message) push("Education", `Item ${i + 1}: ${String(e.school.message)}`, `#education-${i}-school`);
        if (e.degree?.message) push("Education", `Item ${i + 1}: ${String(e.degree.message)}`, `#education-${i}-degree`);
      });
    }
    if (errors.theme) {
      if (errors.theme.accentColor?.message) push("Theme", String(errors.theme.accentColor.message), "#theme-accentColor");
    }
    if (errors.templateId?.message) {
      push("Template", String(errors.templateId.message), "#templateId");
    }
 
    return list;
  }, [errors]);
 
  useEffect(() => {
    // Could scroll into view when errors change
  }, [entries.length]);
 
  if (!entries.length) return null;
 
  return (
    <div
      className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-red-200"
      role="alert"
      aria-live="assertive"
    >
      <p className="mb-2 font-medium">Please fix the following errors:</p>
      <ul className="list-disc pl-6">
        {entries.map((e, idx) => (
          <li key={idx}>
            {e.href ? (
              <a href={e.href} className="underline hover:opacity-90">
                [{e.section}] {e.message}
              </a>
            ) : (
              <span>
                [{e.section}] {e.message}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}