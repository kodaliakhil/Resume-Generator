import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Education } from "../types/resume";

interface Props {
  value: Education[];
  onChange: (education: Education[]) => void;
}

function EducationSection({ value, onChange }: Props) {
  const { register, handleSubmit, reset } = useForm<Education>({
    defaultValues: {
      institution: "",
      degree: "",
      graduationYear: "",
    },
  });

  const onSubmit = (data: Education) => {
    onChange([...value, data]);
    reset();
  };

  const removeEducation = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Education</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("institution")}
          placeholder="Institution"
          className="w-full rounded border p-2"
        />

        <input
          {...register("degree")}
          placeholder="Degree"
          className="w-full rounded border p-2"
        />

        <input
          {...register("graduationYear")}
          placeholder="Graduation Year"
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-white"
        >
          Add Education
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {value.map((education, index) => (
          <div key={index} className="rounded border p-3">
            <p className="font-semibold">{education.degree}</p>

            <p>{education.institution}</p>

            <p>{education.graduationYear}</p>

            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="mt-2 text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationSection;
