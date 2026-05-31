import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="relative flex h-8 w-10 items-end" aria-hidden="true">
              <span className="absolute bottom-0 left-0 h-5 w-5 rounded-full bg-brand-500" />
              <span className="absolute bottom-0 left-3 h-7 w-7 rounded-full bg-brand-500" />
              <span className="absolute bottom-0 left-1 h-3 w-9 rounded-full bg-brand-500" />
            </span>
            <span>
              <span className="block text-base font-bold leading-4 text-dark-900">Dalal Street Edge</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">Market intelligence</span>
            </span>
          </NavLink>
          <div className="flex h-full items-center gap-1">
            <NavLink to="/" className={({ isActive }) => `flex h-full items-center border-b-2 px-4 text-sm font-semibold transition-colors ${isActive ? 'border-brand-500 text-brand-700' : 'border-transparent text-slate-500 hover:text-dark-900'}`}>
              Analyze
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => `flex h-full items-center border-b-2 px-4 text-sm font-semibold transition-colors ${isActive ? 'border-brand-500 text-brand-700' : 'border-transparent text-slate-500 hover:text-dark-900'}`}>
              History
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
