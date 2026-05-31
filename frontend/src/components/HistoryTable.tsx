import { HistoryItem } from '../types'

const STEPS = [
  'Fetching data from Screener.in...',
  'Running Fundamentals Agent...',
  'Running Sentiment Agent...',
  'Running Risk Agent...',
  'Generating final verdict...'
]

interface LoadingStepsProps {
  currentStep: number
}

export function LoadingSteps({ currentStep }: LoadingStepsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-brand-100 border-t-brand-500"></div>
      <p className="text-center font-medium text-slate-600">
        {STEPS[Math.min(currentStep, STEPS.length - 1)]}
      </p>
    </div>
  )
}

interface HistoryTableProps {
  history: HistoryItem[]
  onView: (id: string) => void
}

export function HistoryTable({ history, onView }: HistoryTableProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p className="text-base">No analyses yet. Run your first one.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-6 py-4 font-bold text-dark-900">Ticker</th>
            <th className="px-6 py-4 font-bold text-dark-900">Exchange</th>
            <th className="px-6 py-4 font-bold text-dark-900">Verdict</th>
            <th className="px-6 py-4 font-bold text-dark-900">Date</th>
            <th className="px-6 py-4 font-bold text-dark-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {history.map(item => (
            <tr key={item.id} className="transition-colors hover:bg-brand-50/50">
              <td className="px-6 py-4 font-semibold text-dark-900">{item.ticker}</td>
              <td className="px-6 py-4 text-slate-600">{item.exchange}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  item.verdict === 'BUY' ? 'bg-emerald-900/30 text-emerald-300' :
                  item.verdict === 'HOLD' ? 'bg-amber-900/30 text-amber-300' :
                  'bg-rose-900/30 text-rose-300'
                }`}>
                  {item.verdict}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-600">{new Date(item.date).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onView(item.id)}
                  className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
