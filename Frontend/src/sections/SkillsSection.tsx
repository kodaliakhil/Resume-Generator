import { useState } from "react";
import type { SkillDomain } from "../types/resume";

interface SkillsSectionProps {
  value: SkillDomain[];
  onChange: (skills: SkillDomain[]) => void;
}

function SkillsSection({ value, onChange }: SkillsSectionProps) {
  const [domainName, setDomainName] = useState("");
   const addDomain = () => {
    const name = domainName.trim();

    if (!name) {
      return;
    }

    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        name,
        skills: [],
      },
    ]);

    setDomainName("");
  };

  const removeDomain = (id: string) => {
    onChange(value.filter((domain) => domain.id !== id));
  };

  const addSkill = (
    domainId: string,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    const input = event.currentTarget;
    const skill = input.value.trim();

    if (!skill) {
      return;
    }

    const updated = value.map((domain) => {
      if (domain.id !== domainId) {
        return domain;
      }

      if (domain.skills.includes(skill)) {
        return domain;
      }

      return {
        ...domain,
        skills: [...domain.skills, skill],
      };
    });

    onChange(updated);

    input.value = "";
  };

  const removeSkill = (domainId: string, skill: string) => {
    onChange(
      value.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              skills: domain.skills.filter((s) => s !== skill),
            }
          : domain
      )
    );
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow md:p-6">
      <h2 className="mb-6 text-xl font-semibold">Skills</h2>

      <div className="mb-6 flex gap-2">
        <input
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          placeholder="Add Domain (Frontend, Backend, Database...)"
          className="flex-1 rounded border p-2"
        />

        <button
          type="button"
          onClick={addDomain}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Domain
        </button>
      </div>

      {value.map((domain) => (
        <div
          key={domain.id}
          className="mb-6 rounded border p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">{domain.name}</h3>

            <button
              type="button"
              onClick={() => removeDomain(domain.id)}
              className="text-red-500"
            >
              Remove Domain
            </button>
          </div>

          <input
            placeholder={`Add skill to ${domain.name}`}
            onKeyDown={(e) => addSkill(domain.id, e)}
            className="w-full rounded border p-2"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {domain.skills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => removeSkill(domain.id, skill)}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm"
              >
                {skill} ×
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;
