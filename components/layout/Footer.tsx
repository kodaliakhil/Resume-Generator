export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-white/5">
      <div className="container py-6 text-sm text-white/60">
        <p>© {new Date().getFullYear()} ResumeGen. Built with Next.js & Tailwind.</p>
      </div>
    </footer>
  );
}
