import { useState, useEffect } from 'react'
import { HistoryTable } from '../components/HistoryTable'
import { getHistory } from '../api'
import { HistoryItem } from '../types'

export function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      const data = await getHistory()
      setHistory(data)
      setIsLoading(false)
    }
    loadHistory()
  }, [])

  const handleView = (id: string) => {
    // TODO: Navigate to detailed view or open modal with full analysis
    console.log('View analysis:', id)
  }

  return (
    <main className="dashboard-grid min-h-[calc(100vh-4rem)] bg-[#f7f7f8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Your research</p>
        <h1 className="text-4xl font-bold text-dark-900 mb-10">Analysis History</h1>

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-slate-500">Loading history...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <HistoryTable history={history} onView={handleView} />
          </div>
        )}
      </div>
    </main>
  )
}
