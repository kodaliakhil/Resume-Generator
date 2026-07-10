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
    <div className="rounded-lg bg-white p-6 shadow-sm">
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

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import type { Experience } from "../types/resume";

// function ExperienceSection() {
//   const [experiences, setExperiences] = useState<Experience[]>([]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//   } = useForm<Experience>({
//     defaultValues: {
//       company: "",
//       jobTitle: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//     },
//   });

//   const onSubmit = (data: Experience) => {
//     setExperiences((previousExperiences) => [
//       ...previousExperiences,
//       data,
//     ]);

//     reset();
//   };

//   const removeExperience = (indexToRemove: number) => {
//     setExperiences((previousExperiences) =>
//       previousExperiences.filter(
//         (_, index) => index !== indexToRemove
//       )
//     );
//   };

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-sm">
//       <h2 className="mb-6 text-xl font-semibold text-slate-900">
//         Experience
//       </h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-4"
//       >
//         <div>
//           <label
//             htmlFor="company"
//             className="mb-1 block text-sm font-medium"
//           >
//             Company
//           </label>

//           <input
//             id="company"
//             type="text"
//             {...register("company")}
//             className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="jobTitle"
//             className="mb-1 block text-sm font-medium"
//           >
//             Job Title
//           </label>

//           <input
//             id="jobTitle"
//             type="text"
//             {...register("jobTitle")}
//             className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//           />
//         </div>

//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label
//               htmlFor="startDate"
//               className="mb-1 block text-sm font-medium"
//             >
//               Start Date
//             </label>

//             <input
//               id="startDate"
//               type="month"
//               {...register("startDate")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="endDate"
//               className="mb-1 block text-sm font-medium"
//             >
//               End Date
//             </label>

//             <input
//               id="endDate"
//               type="month"
//               {...register("endDate")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label
//             htmlFor="description"
//             className="mb-1 block text-sm font-medium"
//           >
//             Description
//           </label>

//           <textarea
//             id="description"
//             rows={4}
//             {...register("description")}
//             className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
//         >
//           Add Experience
//         </button>
//       </form>

//       {experiences.length > 0 && (
//         <div className="mt-6 space-y-4">
//           {experiences.map((experience, index) => (
//             <div
//               key={`${experience.company}-${index}`}
//               className="rounded-md border border-slate-200 p-4"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="font-semibold">
//                     {experience.jobTitle}
//                   </h3>

//                   <p className="text-sm text-slate-600">
//                     {experience.company}
//                   </p>

//                   <p className="text-sm text-slate-500">
//                     {experience.startDate} - {experience.endDate}
//                   </p>

//                   <p className="mt-2 text-sm">
//                     {experience.description}
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => removeExperience(index)}
//                   className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ExperienceSection;
