export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="card">
        <h1 className="text-2xl font-semibold">ResumeGen</h1>
        <p className="text-white/80">
          A secure, production-ready resume generatorusing Latex templates. In upcoming steps you'll
          be able to fill the form, pick a resume template, preview and download as PDF
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-2 text-xl font-medium">Form</h2>
          <p className="text-white/70">From using react hook + zod</p>
        </div>
        <div className="card">
          <h2 className="mb-2 text-xl font-medium">Preview</h2>
          <p className="text-white/70">PDF Preview with Debounce</p>
        </div>
      </section>
    </div>
  );
}
