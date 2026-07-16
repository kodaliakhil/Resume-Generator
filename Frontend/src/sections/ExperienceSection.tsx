import { useForm } from "react-hook-form";
import type { Experience } from "../types/resume";
import { useState } from "react";

interface Props {
  value: Experience[];
  onChange: (value: Experience[]) => void;
}

function ExperienceSection({ value, onChange }: Props) {
  const { register, handleSubmit, reset } = useForm<Experience>();
  const [bulletPoints, setBulletPoints] = useState<string[]>([""]);

  const submit = (data: Experience) => {
    onChange([
      ...value,
      {
        ...data,
        bulletPoints: bulletPoints.filter((point) => point.trim()),
      },
    ]);

    reset();
    setBulletPoints([""]);
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };
  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, ""]);
  };

  const updateBulletPoint = (index: number, value: string) => {
    const updated = [...bulletPoints];
    updated[index] = value;
    setBulletPoints(updated);
  };

  const removeBulletPoint = (index: number) => {
    setBulletPoints(bulletPoints.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow md:p-6">
      <h2 className="mb-6 text-xl font-semibold">Experience</h2>

      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <input
          {...register("company")}
          placeholder="Company"
          className="w-full rounded border p-2"
        />

        <input
          {...register("jobTitle")}
          placeholder="Job Title"
          className="w-full rounded border p-2"
        />

        <input
          type="month"
          {...register("startDate")}
          className="w-full rounded border p-2"
        />

        <input
          type="month"
          {...register("endDate")}
          className="w-full rounded border p-2"
        />

        {/* <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full rounded border p-2"
        /> */}
        <div>
          <label className="mb-2 block font-medium">Achievements</label>

          <div className="space-y-2">
            {bulletPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={point}
                  placeholder="e.g. Reduced API response time by 40%"
                  className="flex-1 rounded border p-2"
                  onChange={(e) => updateBulletPoint(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      index === bulletPoints.length - 1
                    ) {
                      e.preventDefault();

                      addBulletPoint();
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => removeBulletPoint(index)}
                  className="rounded bg-red-500 px-3 text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addBulletPoint}
            className="mt-2 text-sm font-medium text-blue-600"
          >
            + Add Achievement
          </button>
        </div>

        <button className="rounded bg-slate-900 px-4 py-2 text-white">
          Add Experience
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {value.map((experience, index) => (
          <div key={index} className="rounded border p-3">
            <p className="font-semibold">{experience.jobTitle}</p>

            <p>{experience.company}</p>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {experience.bulletPoints?.map((point, bulletIndex) => (
                <li key={bulletIndex}>{point}</li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceSection;
