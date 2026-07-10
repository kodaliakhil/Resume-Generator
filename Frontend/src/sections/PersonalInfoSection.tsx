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
    <div className="rounded-lg bg-white p-6 shadow-sm">
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

// import { useForm } from "react-hook-form";
// import type { PersonalInfo } from "../types/resume";

// function PersonalInfoSection() {
//   const {
//     register,
//     handleSubmit,
//   } = useForm<PersonalInfo>({
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       linkedin: "",
//       github: "",
//       location: "",
//     },
//   });

//   const onSubmit = (data: PersonalInfo) => {
//     console.log("Personal Information:", data);
//   };

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-sm">
//       <h2 className="mb-6 text-xl font-semibold text-slate-900">
//         Personal Information
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid gap-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="mb-1 block text-sm font-medium"
//             >
//               Full Name
//             </label>

//             <input
//               id="name"
//               type="text"
//               {...register("name")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="mb-1 block text-sm font-medium"
//             >
//               Email
//             </label>

//             <input
//               id="email"
//               type="email"
//               {...register("email")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="phone"
//               className="mb-1 block text-sm font-medium"
//             >
//               Phone
//             </label>

//             <input
//               id="phone"
//               type="text"
//               {...register("phone")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="linkedin"
//               className="mb-1 block text-sm font-medium"
//             >
//               LinkedIn
//             </label>

//             <input
//               id="linkedin"
//               type="url"
//               {...register("linkedin")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="github"
//               className="mb-1 block text-sm font-medium"
//             >
//               GitHub
//             </label>

//             <input
//               id="github"
//               type="url"
//               {...register("github")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="location"
//               className="mb-1 block text-sm font-medium"
//             >
//               Location
//             </label>

//             <input
//               id="location"
//               type="text"
//               {...register("location")}
//               className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
//           >
//             Save Personal Information
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PersonalInfoSection;
