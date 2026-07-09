import ResumePreview from "./components/ResumePreview";

function App() {
  return (
    <main className="min-h-screen bg-slate-200 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-900">
          Resume Builder MVP
        </h1>

        <ResumePreview />
      </div>
    </main>
  );
}

export default App;
