import { z } from "zod";
 
/**
* Helpers
*/
const EmptyToUndefined = z.preprocess((v) => (v === "" ? undefined : v), z.string().optional());
 
// Date string in ISO-friendly formats. We accept YYYY-MM or YYYY-MM-DD for simplicity.
const DateString = z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD (e.g., 2024-01 or 2024-01-31)");
 
const UrlString = z
  .string()
  .url("Enter a valid URL (include protocol, e.g., https://example.com)");
 
const NonEmptyString = z.string().trim().min(1, "This field is required.");
 
/**
* Link
*/
export const LinkSchema = z.object({
  label: NonEmptyString.max(60, "Label too long"),
  url: UrlString.max(2048, "URL too long")
});
 
/**
* Profile
*/
export const ProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is too short").max(120, "Full name too long"),
  title: z.string().trim().min(2, "Title is too short").max(120, "Title too long"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone seems too short")
    .max(25, "Phone seems too long")
    .optional()
    .or(z.literal("")), // allow empty in UI, will be normalized later
  location: z.string().trim().max(120, "Location too long").optional().or(z.literal("")),
  links: z.array(LinkSchema).default([]),
  summary: z.string().trim().max(2000, "Summary is too long").optional().default("")
});
 
/**
* Experience
*/
export const ExperienceItemSchema = z
  .object({
    company: NonEmptyString.max(120, "Company too long"),
    role: NonEmptyString.max(120, "Role too long"),
    location: z.string().trim().max(120).optional().or(z.literal("")),
    startDate: DateString,
    endDate: EmptyToUndefined.pipe(DateString).optional(),
    current: z.boolean().default(false),
    bullets: z
      .array(z.string().trim().min(1, "Bullet cannot be empty"))
      .max(10, "Limit to 10 bullets")
      .default([])
  })
  .refine(
    (val) => (val.current && !val.endDate) || (!val.current && !!val.endDate),
    "If current is checked, leave end date empty; otherwise provide an end date."
  )
  .refine(
    (val) => {
      if (!val.endDate) return true;
      // Basic lexicographic compare works for YYYY-MM(-DD)
      return val.startDate <= val.endDate;
    },
    { message: "End date must be after start date", path: ["endDate"] }
  );
 
/**
* Projects
*/
export const ProjectItemSchema = z.object({
  name: NonEmptyString.max(120, "Name too long"),
  link: EmptyToUndefined.pipe(UrlString).optional(),
  description: z.string().trim().max(500, "Description too long").optional().or(z.literal("")),
  bullets: z.array(z.string().trim().min(1)).max(10).default([]),
  tech: z.array(z.string().trim().min(1)).max(20).default([])
});
 
/**
* Education
*/
export const EducationItemSchema = z
  .object({
    school: NonEmptyString.max(160, "School name too long"),
    degree: NonEmptyString.max(160, "Degree too long"),
    startDate: DateString,
    endDate: EmptyToUndefined.pipe(DateString).optional(),
    gpa: z
      .string()
      .regex(/^\d+(\.\d+)?$/, "GPA must be a number like 8.5")
      .optional()
      .or(z.literal("")),
    highlights: z.array(z.string().trim().min(1)).max(10).default([])
  })
  .refine(
    (val) => {
      if (!val.endDate) return true;
      return val.startDate <= val.endDate;
    },
    { message: "End date must be after start date", path: ["endDate"] }
  );
 
/**
* Skills
*/
export const SkillsSchema = z.object({
  primary: z.array(z.string().trim().min(1)).max(20).default([]),
  secondary: z.array(z.string().trim().min(1)).max(30).default([]),
  tools: z.array(z.string().trim().min(1)).max(40).default([])
});
 
/**
* Certifications
*/
export const CertificationItemSchema = z.object({
  name: NonEmptyString.max(160),
  issuer: NonEmptyString.max(160),
  date: DateString
});
 
/**
* Extras
*/
export const ExtraItemSchema = z.object({
  sectionTitle: NonEmptyString.max(160),
  bullets: z.array(z.string().trim().min(1)).max(10).default([])
});
 
/**
* Theme
*/
export const ThemeSchema = z.object({
  accentColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Use a HEX color like #2F6FED")
    .default("#2F6FED"),
  fontSizeScale: z.number().min(0.85).max(1.3).default(1.0),
  spacingScale: z.number().min(0.85).max(1.3).default(1.0),
  showIcons: z.boolean().default(false),
  showPhoto: z.boolean().default(false)
});
 
/**
* Template ID
*/
export const TemplateIdSchema = z.enum(["classic", "modern", "ats"]);
 
/**
* Canonical Form Data
*/
export const ResumeFormSchema = z.object({
  templateId: TemplateIdSchema.default("classic"),
  theme: ThemeSchema.default({} as any), // defaults applied
  profile: ProfileSchema,
  experience: z.array(ExperienceItemSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  education: z.array(EducationItemSchema).default([]),
  skills: SkillsSchema.default({} as any),
  certifications: z.array(CertificationItemSchema).default([]),
  extras: z.array(ExtraItemSchema).default([])
});
 
export type ResumeFormData = z.infer<typeof ResumeFormSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type TemplateId = z.infer<typeof TemplateIdSchema>;