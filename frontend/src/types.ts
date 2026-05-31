export interface AgentResult {
  name: string
  confidence: number
  findings: string[]
}

export interface AnalysisResult {
  id: string
  ticker: string
  exchange: 'NSE' | 'BSE'
  verdict: 'BUY' | 'HOLD' | 'WATCH'
  timestamp: string
  fundamentals: AgentResult
  sentiment: AgentResult
  risk: AgentResult
  summary: string
}

export interface HistoryItem {
  id: string
  ticker: string
  exchange: 'NSE' | 'BSE'
  verdict: 'BUY' | 'HOLD' | 'WATCH'
  date: string
}
