interface SkillsSectionProps {
  value: string[];
  onChange: (skills: string[]) => void;
}

function SkillsSection({ value, onChange }: SkillsSectionProps) {
  const addSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const skill = input.value.trim();

    if (!skill) {
      return;
    }

    if (value.includes(skill)) {
      return;
    }

    onChange([...value, skill]);

    input.value = "";
  };

  const removeSkill = (skill: string) => {
    onChange(value.filter((currentSkill) => currentSkill !== skill));
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow md:p-6">
      <h2 className="mb-6 text-xl font-semibold">Skills</h2>

      <input
        placeholder="Type a skill and press Enter"
        onKeyDown={addSkill}
        className="w-full rounded border p-2"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {value.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => removeSkill(skill)}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            {skill} ×
          </button>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;
