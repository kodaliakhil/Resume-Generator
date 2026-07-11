import { useForm } from "react-hook-form";
import type { Experience } from "../types/resume";

interface Props {
  value: Experience[];
  onChange: (value: Experience[]) => void;
}

function ExperienceSection({ value, onChange }: Props) {
  const { register, handleSubmit, reset } = useForm<Experience>();

  const submit = (data: Experience) => {
    onChange([...value, data]);
    reset();
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
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

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full rounded border p-2"
        />

        <button className="rounded bg-slate-900 px-4 py-2 text-white">
          Add Experience
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {value.map((experience, index) => (
          <div key={index} className="rounded border p-3">
            <p className="font-semibold">{experience.jobTitle}</p>

            <p>{experience.company}</p>

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
