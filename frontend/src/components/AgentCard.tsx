import { AgentResult } from '../types'

interface AgentCardProps {
  agent: AgentResult
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
      <div className="mb-4 h-1 w-10 rounded-full bg-brand-500" />
      <h3 className="text-lg font-bold text-dark-900 mb-4">
        {agent.name}
      </h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-500">Confidence Score</span>
          <span className="text-sm font-bold text-brand-600">{agent.confidence}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100">
          <div
            className="h-2.5 rounded-full bg-brand-500 transition-all duration-300"
            style={{ width: `${agent.confidence}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-dark-800">Key findings</h4>
        <ul className="space-y-2">
          {agent.findings.map((finding, idx) => (
            <li key={idx} className="flex text-sm leading-relaxed text-slate-600">
              <span className="mr-2 text-brand-500 font-bold">+</span>
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
