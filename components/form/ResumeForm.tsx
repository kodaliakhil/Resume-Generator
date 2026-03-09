"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeFormSchema, type ResumeFormData, TemplateIdSchema } from "@/lib/schemas/form";
import { defaultFormData } from "@/lib/defaults";
import { Button } from "@/components/ui/Button";
import { ErrorSummary } from "./ErrorSummary";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { TemplatePicker } from "./TemplatePicker";
import { ThemeControls } from "./ThemeControls";
import { useToast } from "@/components/toast/useToast";
import { downloadPdf } from "@/app/lib/api";

export function ResumeForm({ onChange }: { onChange?: (data: ResumeFormData) => void }) {
  const { show } = useToast();
  const [livePreview, setLivePreview] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(ResumeFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: defaultFormData,
  });

  const expArray = useFieldArray({ control, name: "experience" });
  const eduArray = useFieldArray({ control, name: "education" });
  const linkArray = useFieldArray({ control, name: "profile.links" });

  const data = watch();

  // // Bubble up to parent (page) so Preview can consume the latest form value
  // useEffect(() => {
  //   onChange?.(data);
  // }, [data, onChange]);
  useEffect(() => {
    const sub = watch((value) => onChange?.(value as ResumeFormData));
    return () => sub.unsubscribe();
  }, [watch, onChange]);

  const onValidate = async (d: ResumeFormData) => {
    // Only validation in this handler
    show({ variant: "success", message: "Form validation passed." });
  };

  const onDownload = async () => {
    // Ensure latest fields pass validation before hitting compile
    const ok = await trigger();
    if (!ok) {
      show({
        variant: "error",
        title: "Validation failed",
        message: "Fix errors before download.",
      });
      return;
    }
    try {
      await downloadPdf(watch());
      show({ variant: "success", message: "Downloaded PDF successfully." });
    } catch (err: any) {
      show({ variant: "error", title: "Download failed", message: err?.message || String(err) });
    }
  };

  // For TemplatePicker + ThemeControls
  const currentTemplateId = data.templateId;
  const templateError = errors.templateId?.message ? String(errors.templateId.message) : undefined;

  return (
    <form onSubmit={handleSubmit(onValidate)} noValidate className="space-y-6">
      <ErrorSummary errors={errors} />

      {/* Template & Theme */}
      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Template & Theme</h2>

        <TemplatePicker
          value={currentTemplateId}
          onChange={(tid) =>
            setValue("templateId", tid, { shouldValidate: true, shouldDirty: true })
          }
          error={templateError}
        />

        <ThemeControls
          value={data.theme}
          onChange={(next) => setValue("theme", next, { shouldValidate: true, shouldDirty: true })}
          errors={{
            accentColor: errors.theme?.accentColor
              ? String(errors.theme.accentColor.message)
              : undefined,
          }}
        />
      </section>

      {/* Profile */}
      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="profile-fullName" className="mb-1 block text-sm font-medium">
              Full name
            </label>
            <input
              id="profile-fullName"
              {...register("profile.fullName")}
              className={clsx(
                "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                errors.profile?.fullName && "border-red-500/50"
              )}
              aria-invalid={!!errors.profile?.fullName}
            />
            {errors.profile?.fullName?.message && (
              <p className="mt-1 text-sm text-red-300">{String(errors.profile.fullName.message)}</p>
            )}
          </div>
          <div>
            <label htmlFor="profile-title" className="mb-1 block text-sm font-medium">
              Title
            </label>
            <input
              id="profile-title"
              {...register("profile.title")}
              className={clsx(
                "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                errors.profile?.title && "border-red-500/50"
              )}
              aria-invalid={!!errors.profile?.title}
            />
            {errors.profile?.title?.message && (
              <p className="mt-1 text-sm text-red-300">{String(errors.profile.title.message)}</p>
            )}
          </div>
          <div>
            <label htmlFor="profile-email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              {...register("profile.email")}
              className={clsx(
                "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                errors.profile?.email && "border-red-500/50"
              )}
              aria-invalid={!!errors.profile?.email}
            />
            {errors.profile?.email?.message && (
              <p className="mt-1 text-sm text-red-300">{String(errors.profile.email.message)}</p>
            )}
          </div>
          <div>
            <label htmlFor="profile-phone" className="mb-1 block text-sm font-medium">
              Phone (optional)
            </label>
            <input
              id="profile-phone"
              {...register("profile.phone")}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="profile-location" className="mb-1 block text-sm font-medium">
              Location (optional)
            </label>
            <input
              id="profile-location"
              {...register("profile.location")}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="profile-summary" className="mb-1 block text-sm font-medium">
              Summary (optional)
            </label>
            <textarea
              id="profile-summary"
              rows={4}
              {...register("profile.summary")}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
            />
          </div>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Links</h3>
            <Button
              type="button"
              variant="secondary"
              onClick={() => linkArray.append({ label: "", url: "" })}
            >
              + Add Link
            </Button>
          </div>
          {linkArray.fields.length === 0 && (
            <p className="text-sm text-white/60">No links added yet.</p>
          )}
          <div className="space-y-3">
            {linkArray.fields.map((f, idx) => (
              <div key={f.id} className="grid gap-3 md:grid-cols-12">
                <div className="md:col-span-4">
                  <label className="mb-1 block text-sm font-medium" htmlFor={`links-${idx}-label`}>
                    Label
                  </label>
                  <input
                    id={`links-${idx}-label`}
                    {...register(`profile.links.${idx}.label` as const)}
                    className={clsx(
                      "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                      errors.profile?.links?.[idx]?.label && "border-red-500/50"
                    )}
                    aria-invalid={!!errors.profile?.links?.[idx]?.label}
                  />
                  {errors.profile?.links?.[idx]?.label?.message && (
                    <p className="mt-1 text-sm text-red-300">
                      {String(errors.profile.links[idx]?.label?.message)}
                    </p>
                  )}
                </div>
                <div className="md:col-span-7">
                  <label className="mb-1 block text-sm font-medium" htmlFor={`links-${idx}-url`}>
                    URL
                  </label>
                  <input
                    id={`links-${idx}-url`}
                    {...register(`profile.links.${idx}.url` as const)}
                    className={clsx(
                      "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                      errors.profile?.links?.[idx]?.url && "border-red-500/50"
                    )}
                    aria-invalid={!!errors.profile?.links?.[idx]?.url}
                  />
                  {errors.profile?.links?.[idx]?.url?.message && (
                    <p className="mt-1 text-sm text-red-300">
                      {String(errors.profile.links[idx]?.url?.message)}
                    </p>
                  )}
                </div>
                <div className="md:col-span-1 flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => linkArray.remove(idx)}
                    aria-label={`Remove link ${idx + 1}`}
                    title="Remove"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Experience</h2>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              expArray.append({
                company: "",
                role: "",
                location: "",
                startDate: "2024-01",
                endDate: undefined,
                current: true,
                bullets: [],
              })
            }
          >
            + Add Experience
          </Button>
        </div>

        {expArray.fields.map((f, idx) => (
          <div key={f.id} className="rounded-xl border border-white/10 p-3">
            <div className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-4">
                <label
                  htmlFor={`experience-${idx}-company`}
                  className="mb-1 block text-sm font-medium"
                >
                  Company
                </label>
                <input
                  id={`experience-${idx}-company`}
                  {...register(`experience.${idx}.company` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.experience?.[idx]?.company && "border-red-500/50"
                  )}
                  aria-invalid={!!errors.experience?.[idx]?.company}
                />
              </div>
              <div className="md:col-span-4">
                <label
                  htmlFor={`experience-${idx}-role`}
                  className="mb-1 block text-sm font-medium"
                >
                  Role
                </label>
                <input
                  id={`experience-${idx}-role`}
                  {...register(`experience.${idx}.role` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.experience?.[idx]?.role && "border-red-500/50"
                  )}
                  aria-invalid={!!errors.experience?.[idx]?.role}
                />
              </div>
              <div className="md:col-span-4">
                <label
                  htmlFor={`experience-${idx}-location`}
                  className="mb-1 block text-sm font-medium"
                >
                  Location (optional)
                </label>
                <input
                  id={`experience-${idx}-location`}
                  {...register(`experience.${idx}.location` as const)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
                />
              </div>
              <div className="md:col-span-3">
                <label
                  htmlFor={`experience-${idx}-startDate`}
                  className="mb-1 block text-sm font-medium"
                >
                  Start (YYYY-MM)
                </label>
                <input
                  id={`experience-${idx}-startDate`}
                  placeholder="2024-01"
                  {...register(`experience.${idx}.startDate` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.experience?.[idx]?.startDate && "border-red-500/50"
                  )}
                  aria-invalid={!!errors.experience?.[idx]?.startDate}
                />
              </div>
              <div className="md:col-span-3">
                <label
                  htmlFor={`experience-${idx}-endDate`}
                  className="mb-1 block text-sm font-medium"
                >
                  End (YYYY-MM) or empty if current
                </label>
                <input
                  id={`experience-${idx}-endDate`}
                  placeholder="2025-06"
                  {...register(`experience.${idx}.endDate` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.experience?.[idx]?.endDate && "border-red-500/50"
                  )}
                  aria-invalid={!!errors.experience?.[idx]?.endDate}
                />
              </div>
              <label className="md:col-span-4 mt-7 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...register(`experience.${idx}.current` as const)}
                  className="h-4 w-4"
                />
                Current role
              </label>
              <div className="md:col-span-2 mt-7 flex items-center justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => expArray.remove(idx)}
                  aria-label={`Remove experience ${idx + 1}`}
                  title="Remove"
                >
                  ✕
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Education</h2>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              eduArray.append({
                school: "",
                degree: "",
                startDate: "2020-01",
                endDate: "2024-01",
                gpa: "",
                highlights: [],
              })
            }
          >
            + Add Education
          </Button>
        </div>
        {eduArray.fields.map((f, idx) => (
          <div key={f.id} className="rounded-xl border border-white/10 p-3">
            <div className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-5">
                <label
                  htmlFor={`education-${idx}-school`}
                  className="mb-1 block text-sm font-medium"
                >
                  School
                </label>
                <input
                  id={`education-${idx}-school`}
                  {...register(`education.${idx}.school` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.education?.[idx]?.school && "border-red-500/50"
                  )}
                />
              </div>
              <div className="md:col-span-5">
                <label
                  htmlFor={`education-${idx}-degree`}
                  className="mb-1 block text-sm font-medium"
                >
                  Degree
                </label>
                <input
                  id={`education-${idx}-degree`}
                  {...register(`education.${idx}.degree` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.education?.[idx]?.degree && "border-red-500/50"
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor={`education-${idx}-gpa`} className="mb-1 block text-sm font-medium">
                  GPA (optional)
                </label>
                <input
                  id={`education-${idx}-gpa`}
                  placeholder="8.5"
                  {...register(`education.${idx}.gpa` as const)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
                />
              </div>
              <div className="md:col-span-3">
                <label
                  htmlFor={`education-${idx}-startDate`}
                  className="mb-1 block text-sm font-medium"
                >
                  Start (YYYY-MM)
                </label>
                <input
                  id={`education-${idx}-startDate`}
                  placeholder="2020-01"
                  {...register(`education.${idx}.startDate` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.education?.[idx]?.startDate && "border-red-500/50"
                  )}
                />
              </div>
              <div className="md:col-span-3">
                <label
                  htmlFor={`education-${idx}-endDate`}
                  className="mb-1 block text-sm font-medium"
                >
                  End (YYYY-MM)
                </label>
                <input
                  id={`education-${idx}-endDate`}
                  placeholder="2024-01"
                  {...register(`education.${idx}.endDate` as const)}
                  className={clsx(
                    "w-full rounded-lg border border-white/10 bg-white/5 p-2",
                    errors.education?.[idx]?.endDate && "border-red-500/50"
                  )}
                />
              </div>
              <div className="md:col-span-2 mt-7 flex items-center justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => eduArray.remove(idx)}
                  aria-label={`Remove education ${idx + 1}`}
                  title="Remove"
                >
                  ✕
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Primary (comma separated)</label>
            <input
              placeholder="React, TypeScript, Node.js"
              {...register("skills.primary" as const, {
                setValueAs: (v: string) =>
                  Array.isArray(v)
                    ? v
                    : String(v ?? "")
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
              })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Secondary (comma separated)</label>
            <input
              placeholder="AWS, Docker"
              {...register("skills.secondary" as const, {
                setValueAs: (v: string) =>
                  Array.isArray(v)
                    ? v
                    : String(v ?? "")
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
              })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Tools (comma separated)</label>
            <input
              placeholder="Git, Jira"
              {...register("skills.tools" as const, {
                setValueAs: (v: string) =>
                  Array.isArray(v)
                    ? v
                    : String(v ?? "")
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
              })}
              className="w-full rounded-lg border border-white/10 bg-white/5 p-2"
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          Validate Data
        </Button>

        <Button type="button" variant="secondary" onClick={onDownload}>
          Download PDF
        </Button>

        <label className="ml-auto flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={livePreview}
            onChange={(e) => setLivePreview(e.target.checked)}
          />
          Live Preview (debounced)
        </label>
      </div>
    </form>
  );
}
