interface ProfessionalSummarySectionProps {
  value: string;
  onChange: (value: string) => void;
}

function ProfessionalSummarySection({
  value,
  onChange,
}: ProfessionalSummarySectionProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow md:p-6">
      <h2 className="mb-6 text-xl font-semibold">Professional Summary</h2>

      <textarea
        rows={6}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border p-3"
        placeholder="Write your professional summary..."
      />
    </div>
  );
}

export default ProfessionalSummarySection;
