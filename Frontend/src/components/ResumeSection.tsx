import type { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

function ResumeSection({
  title,
  children,
}: ResumeSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wide text-slate-800">
        {title}
      </h2>

      <div>{children}</div>
    </section>
  );
}

export default ResumeSection;