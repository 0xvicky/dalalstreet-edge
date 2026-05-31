interface TickerInputProps {
  ticker: string
  exchange: 'NSE' | 'BSE'
  onTickerChange: (value: string) => void
  onExchangeChange: (value: 'NSE' | 'BSE') => void
  onAnalyze: () => void
  isLoading: boolean
}

export function TickerInput({
  ticker,
  exchange,
  onTickerChange,
  onExchangeChange,
  onAnalyze,
  isLoading
}: TickerInputProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="block text-sm font-semibold text-dark-800 mb-2">
          Stock Ticker
        </label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => onTickerChange(e.target.value.toUpperCase())}
          placeholder="e.g., RELIANCE"
          className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-dark-900 placeholder-slate-400 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          disabled={isLoading}
        />
      </div>
      
      <div className="sm:w-32">
        <label className="block text-sm font-semibold text-dark-800 mb-2">
          Exchange
        </label>
        <select
          value={exchange}
          onChange={(e) => onExchangeChange(e.target.value as 'NSE' | 'BSE')}
          className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-dark-900 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          disabled={isLoading}
        >
          <option>NSE</option>
          <option>BSE</option>
        </select>
      </div>
      
      <button
        onClick={onAnalyze}
        disabled={isLoading || !ticker}
        className="rounded-md bg-brand-500 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  )
}
