export function Header() {
  return (
    <header className="border-b border-white/10 bg-white/5">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent font-bold">
            R
          </span>
          <span className="text-lg font-semibold">ResumeGen</span>
        </div>
        <nav aria-label="primary">
          <ul className="flex items-center gap-4 text-white/80">
            <li>
              <a className="hover:text-white" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="/api/health">
                Health
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
