import type React from "react";
import type { PersonalInfo } from "../types/resume";

interface PersonalInfoSectionProps {
  value: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

function PersonalInfoSection({ value, onChange }: PersonalInfoSectionProps) {
  const handleChange =
    (field: keyof PersonalInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        [field]: event.target.value,
      });
    };

  return (
    <div className="rounded-lg bg-white p-4 shadow md:p-6">
      <h2 className="mb-6 text-xl font-semibold">Personal Information</h2>

      <div className="space-y-4">
        <input
          placeholder="Full Name"
          value={value.name}
          onChange={handleChange("name")}
          className="w-full rounded border p-2"
        />

        <input
          placeholder="Email"
          value={value.email}
          onChange={handleChange("email")}
          className="w-full rounded border p-2"
        />

        <input
          placeholder="Phone"
          value={value.phone}
          onChange={handleChange("phone")}
          className="w-full rounded border p-2"
        />

        <input
          placeholder="LinkedIn"
          value={value.linkedin}
          onChange={handleChange("linkedin")}
          className="w-full rounded border p-2"
        />

        <input
          placeholder="GitHub"
          value={value.github}
          onChange={handleChange("github")}
          className="w-full rounded border p-2"
        />

        <input
          placeholder="Location"
          value={value.location}
          onChange={handleChange("location")}
          className="w-full rounded border p-2"
        />
      </div>
    </div>
  );
}

export default PersonalInfoSection;
