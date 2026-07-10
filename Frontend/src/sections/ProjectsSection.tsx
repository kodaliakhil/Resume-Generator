import { useForm } from "react-hook-form";
import type { Project } from "../types/resume";

interface Props {
  value: Project[];
  onChange: (value: Project[]) => void;
}

function ProjectsSection({ value, onChange }: Props) {
  // const [projects, setProjects] = useState<Project[]>([]);

  const { register, handleSubmit, reset } = useForm<Project>({
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      projectLink: "",
    },
  });

  const onSubmit = (data: Project) => {
    // setProjects((previousProjects) => [...previousProjects, data]);
    onChange([...value, data]);
    reset();
  };

  const removeProject = (indexToRemove: number) => {
    // setProjects((previousProjects) =>
    //   previousProjects.filter((_, index) => index !== indexToRemove),
    // );
    onChange(value.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">Projects</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Project Title
          </label>

          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="technologies"
            className="mb-1 block text-sm font-medium"
          >
            Technologies
          </label>

          <input
            id="technologies"
            type="text"
            placeholder="React, TypeScript, Node.js"
            {...register("technologies")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="projectLink"
            className="mb-1 block text-sm font-medium"
          >
            Project Link
          </label>

          <input
            id="projectLink"
            type="url"
            {...register("projectLink")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        >
          Add Project
        </button>
      </form>

      {value.length > 0 && (
        <div className="mt-6 space-y-4">
          {value.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="rounded-md border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{project.title}</h3>

                  <p className="mt-2 text-sm">{project.description}</p>

                  <p className="mt-2 text-sm text-slate-600">
                    Technologies: {project.technologies}
                  </p>

                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block text-sm text-blue-600 hover:underline"
                    >
                      {project.projectLink}
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsSection;
