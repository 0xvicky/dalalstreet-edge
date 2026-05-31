interface SummaryBoxProps {
  summary: string
}

export function SummaryBox({ summary }: SummaryBoxProps) {
  return (
    <div className="mt-8 rounded-lg border border-brand-200 bg-brand-50 p-6 shadow-sm">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Agent consensus</p>
      <h3 className="text-lg font-bold text-dark-900 mb-3">
        Final Summary
      </h3>
      <p className="text-base leading-relaxed text-slate-700">
        {summary}
      </p>
    </div>
  )
}
