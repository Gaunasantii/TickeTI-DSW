export const LogoIcon=({ className = "h-8 w-8" })=> {
  return (
    <svg viewBox="0 0 44 44" className={className}>
      <rect width="44" height="44" rx="10" className="fill-slate-900" />
      <path d="M10 22 a12 12 0 0 1 24 0" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <rect x="7" y="20" width="7" height="11" rx="3" fill="white" />
      <rect x="30" y="20" width="7" height="11" rx="3" fill="white" />
      <path d="M37 26 v4 a5 5 0 0 1 -5 5 h-4" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}