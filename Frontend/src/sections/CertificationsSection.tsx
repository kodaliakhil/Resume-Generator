import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Certification } from "../types/resume";

interface Props {
  value: Certification[];
  onChange: (certifications: Certification[]) => void;
}

function CertificationsSection({ value, onChange }: Props) {
  const { register, handleSubmit, reset } = useForm<Certification>({
    defaultValues: {
      name: "",
      issuer: "",
      year: "",
    },
  });

  const onSubmit = (data: Certification) => {
    onChange([...value, data]);

    reset();
  };

  const removeCertification = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow md:p-6">
      <h2 className="mb-6 text-xl font-semibold">Certifications</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Certification Name"
          className="w-full rounded border p-2"
        />

        <input
          {...register("issuer")}
          placeholder="Issuer"
          className="w-full rounded border p-2"
        />

        <input
          {...register("year")}
          placeholder="Year"
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-white"
        >
          Add Certification
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {value.map((certification, index) => (
          <div key={index} className="rounded border p-3">
            <p className="font-semibold">{certification.name}</p>

            <p>{certification.issuer}</p>

            <p>{certification.year}</p>

            <button
              type="button"
              onClick={() => removeCertification(index)}
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

export default CertificationsSection;
