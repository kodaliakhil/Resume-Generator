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
    <div className="rounded-lg bg-white p-6 shadow-sm">
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

// import { useState } from "react";
// import { useForm } from "react-hook-form";

// interface SkillsFormData {
//   skill: string;
// }

// function SkillsSection() {
//   const [skills, setSkills] = useState<string[]>([]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//   } = useForm<SkillsFormData>({
//     defaultValues: {
//       skill: "",
//     },
//   });

//   const onSubmit = (data: SkillsFormData) => {
//     const trimmedSkill = data.skill.trim();

//     if (!trimmedSkill) {
//       return;
//     }

//     if (skills.includes(trimmedSkill)) {
//       return;
//     }

//     setSkills((previousSkills) => [
//       ...previousSkills,
//       trimmedSkill,
//     ]);

//     reset();
//   };

//   const removeSkill = (skillToRemove: string) => {
//     setSkills((previousSkills) =>
//       previousSkills.filter(
//         (skill) => skill !== skillToRemove
//       )
//     );
//   };

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-sm">
//       <h2 className="mb-6 text-xl font-semibold text-slate-900">
//         Skills
//       </h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex gap-2"
//       >
//         <input
//           type="text"
//           placeholder="Add a skill"
//           {...register("skill")}
//           className="flex-1 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//         />

//         <button
//           type="submit"
//           className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
//         >
//           Add
//         </button>
//       </form>

//       <div className="mt-4 flex flex-wrap gap-2">
//         {skills.map((skill) => (
//           <div
//             key={skill}
//             className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm"
//           >
//             <span>{skill}</span>

//             <button
//               type="button"
//               onClick={() => removeSkill(skill)}
//               className="font-bold text-red-500 hover:text-red-700"
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-md bg-slate-50 p-3">
//         <p className="text-sm text-slate-600">
//           Current Skills:
//         </p>

//         <pre className="mt-2 overflow-auto text-xs">
//           {JSON.stringify(skills, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }

// export default SkillsSection;
