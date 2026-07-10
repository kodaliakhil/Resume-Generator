interface ProfessionalSummarySectionProps {
  value: string;
  onChange: (value: string) => void;
}

function ProfessionalSummarySection({
  value,
  onChange,
}: ProfessionalSummarySectionProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Professional Summary</h2>

      <textarea
        rows={6}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border p-3"
        placeholder="Write your professional summary..."
      />
    </div>
  );
}

export default ProfessionalSummarySection;

// import { useForm } from "react-hook-form";

// interface ProfessionalSummaryFormData {
//   summary: string;
// }

// function ProfessionalSummarySection() {
//   const { register, handleSubmit } =
//     useForm<ProfessionalSummaryFormData>({
//       defaultValues: {
//         summary: "",
//       },
//     });

//   const onSubmit = (
//     data: ProfessionalSummaryFormData
//   ) => {
//     console.log("Professional Summary:", data);
//   };

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-sm">
//       <h2 className="mb-6 text-xl font-semibold text-slate-900">
//         Professional Summary
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label
//             htmlFor="summary"
//             className="mb-1 block text-sm font-medium"
//           >
//             Summary
//           </label>

//           <textarea
//             id="summary"
//             rows={6}
//             {...register("summary")}
//             className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
//             placeholder="Write a brief professional summary..."
//           />
//         </div>

//         <button
//           type="submit"
//           className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
//         >
//           Save Professional Summary
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ProfessionalSummarySection;
