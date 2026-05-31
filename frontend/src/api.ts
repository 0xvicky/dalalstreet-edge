import { AnalysisResult, HistoryItem } from './types'

// TODO: replace with API call
export async function analyzeStock(ticker: string, exchange: string): Promise<AnalysisResult> {
  // Mock API call - will be replaced with real backend call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: `${ticker}-${Date.now()}`,
        ticker,
        exchange: exchange as 'NSE' | 'BSE',
        verdict: 'BUY',
        timestamp: new Date().toISOString(),
        fundamentals: {
          name: 'Fundamentals Agent',
          confidence: 85,
          findings: [
            'P/E ratio: 18.5x (below industry average)',
            'ROE: 22% (strong)',
            'Debt-to-Equity: 0.45 (healthy)',
            'Revenue growth: 15% YoY'
          ]
        },
        sentiment: {
          name: 'Sentiment Agent',
          confidence: 72,
          findings: [
            'Positive news sentiment (3 recent positive articles)',
            'Analyst upgrade from 3 major brokers',
            'Social media bullish (65% positive posts)',
            'Institutional buying: 2.3% in last quarter'
          ]
        },
        risk: {
          name: 'Risk Agent',
          confidence: 68,
          findings: [
            'Beta: 1.2 (moderate volatility)',
            'Sector headwinds: Small (regulatory)',
            'Liquidity risk: Low',
            'Currency risk: Minimal (domestic focus)'
          ]
        },
        summary: 'Strong fundamentals with improving sentiment make this an attractive entry point. The company shows consistent earnings growth and healthy balance sheet metrics. While sector-specific headwinds exist, institutional support and technical setup suggest upside potential in the medium term.'
      })
    }, 500)
  })
}

// TODO: replace with API call
export async function getHistory(): Promise<HistoryItem[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: '1', ticker: 'RELIANCE', exchange: 'BSE', verdict: 'BUY', date: '2024-01-15' },
        { id: '2', ticker: 'TCS', exchange: 'NSE', verdict: 'HOLD', date: '2024-01-14' },
        { id: '3', ticker: 'INFY', exchange: 'NSE', verdict: 'HOLD', date: '2024-01-13' },
        { id: '4', ticker: 'HDFCBANK', exchange: 'NSE', verdict: 'BUY', date: '2024-01-12' },
        { id: '5', ticker: 'WIPRO', exchange: 'BSE', verdict: 'WATCH', date: '2024-01-11' }
      ])
    }, 300)
  })
}

// TODO: replace with API call
export async function getAnalysisById(id: string): Promise<AnalysisResult | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id,
        ticker: 'RELIANCE',
        exchange: 'BSE',
        verdict: 'BUY',
        timestamp: '2024-01-15T10:30:00Z',
        fundamentals: {
          name: 'Fundamentals Agent',
          confidence: 85,
          findings: [
            'P/E ratio: 18.5x (below industry average)',
            'ROE: 22% (strong)',
            'Debt-to-Equity: 0.45 (healthy)',
            'Revenue growth: 15% YoY'
          ]
        },
        sentiment: {
          name: 'Sentiment Agent',
          confidence: 72,
          findings: [
            'Positive news sentiment (3 recent positive articles)',
            'Analyst upgrade from 3 major brokers',
            'Social media bullish (65% positive posts)',
            'Institutional buying: 2.3% in last quarter'
          ]
        },
        risk: {
          name: 'Risk Agent',
          confidence: 68,
          findings: [
            'Beta: 1.2 (moderate volatility)',
            'Sector headwinds: Small (regulatory)',
            'Liquidity risk: Low',
            'Currency risk: Minimal (domestic focus)'
          ]
        },
        summary: 'Strong fundamentals with improving sentiment make this an attractive entry point.'
      })
    }, 300)
  })
}
