import { useState, useEffect } from 'react'
import { TickerInput } from '../components/TickerInput'
import { VerdictBadge } from '../components/VerdictBadge'
import { AgentCard } from '../components/AgentCard'
import { SummaryBox } from '../components/SummaryBox'
import { LoadingSteps } from '../components/HistoryTable'
import { analyzeStock } from '../api'
import { AnalysisResult } from '../types'

export function Analyze() {
  const [ticker, setTicker] = useState('')
  const [exchange, setExchange] = useState<'NSE' | 'BSE'>('NSE')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setCurrentStep(prev => prev + 1)
    }, 1200)

    return () => clearInterval(interval)
  }, [isLoading])

  const handleAnalyze = async () => {
    if (!ticker) return

    setIsLoading(true)
    setCurrentStep(0)
    setResult(null)

    const data = await analyzeStock(ticker, exchange)
    setResult(data)
    setIsLoading(false)
  }

  return (
    <main className="dashboard-grid min-h-[calc(100vh-4rem)] bg-[#f7f7f8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Multi-agent analysis
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-dark-900 sm:text-5xl">
            Find your edge before<br className="hidden sm:block" /> the market moves.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Run a focused stock analysis across fundamentals, sentiment, and risk for NSE and BSE listings.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Start a new analysis</p>
          <TickerInput
            ticker={ticker}
            exchange={exchange}
            onTickerChange={setTicker}
            onExchangeChange={setExchange}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSteps currentStep={currentStep} />}

        {/* Results */}
        {result && !isLoading && (
          <div className="animate-fadeIn">
            <VerdictBadge verdict={result.verdict} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <AgentCard agent={result.fundamentals} />
              <AgentCard agent={result.sentiment} />
              <AgentCard agent={result.risk} />
            </div>

            <SummaryBox summary={result.summary} />
          </div>
        )}
      </div>
    </main>
  )
}
