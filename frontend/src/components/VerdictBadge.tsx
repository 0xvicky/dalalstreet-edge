interface VerdictBadgeProps {
  verdict: 'BUY' | 'HOLD' | 'WATCH'
}

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const getStyles = () => {
    switch (verdict) {
      case 'BUY':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'HOLD':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'WATCH':
        return 'bg-rose-50 text-rose-700 border-rose-200'
    }
  }

  return (
    <div className="flex justify-center mb-8">
      <div className={`rounded-lg border px-8 py-4 text-center ${getStyles()}`}>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">Final verdict</p>
        <p className="text-xl font-bold">{verdict}</p>
      </div>
    </div>
  )
}
