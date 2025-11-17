import type { Node, NodeStatus } from '../types'

interface NodeCompactProps {
  nodes: Node[]
  nodeStatuses: Record<string, NodeStatus>
  onNodeClick: (nodeId: string) => void
}

export function NodeCompact({ nodes, nodeStatuses, onNodeClick }: NodeCompactProps) {
  return (
    <div className="space-y-3">
      {nodes.map((node) => {
        const status = nodeStatuses[node.uuid]
        const isOnline = !!status
        
        return (
          <div
            key={node.uuid}
            className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all duration-200"
            onClick={() => onNodeClick(node.uuid)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <span className="text-white font-medium">{node.name}</span>
                <span className="text-white/60 text-sm">{node.region}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-white/60">
                  CPU: <span className="text-white">
                    {status ? `${status.cpu.usage.toFixed(1)}%` : '--'}
                  </span>
                </span>
                <span className="text-white/60">
                  RAM: <span className="text-white">
                    {status ? `${((status.ram.used / status.ram.total) * 100).toFixed(1)}%` : '--'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}