import type { Node, NodeStatus } from '../types'

interface NodeTableProps {
  nodes: Node[]
  nodeStatuses: Record<string, NodeStatus>
  onNodeClick: (nodeId: string) => void
}

export function NodeTable({ nodes, nodeStatuses, onNodeClick }: NodeTableProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/80 font-medium">状态</th>
              <th className="text-left p-4 text-white/80 font-medium">名称</th>
              <th className="text-left p-4 text-white/80 font-medium">地区</th>
              <th className="text-left p-4 text-white/80 font-medium">CPU</th>
              <th className="text-left p-4 text-white/80 font-medium">内存</th>
              <th className="text-left p-4 text-white/80 font-medium">磁盘</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => {
              const status = nodeStatuses[node.uuid]
              const isOnline = !!status
              
              return (
                <tr
                  key={node.uuid}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => onNodeClick(node.uuid)}
                >
                  <td className="p-4">
                    <div className={`w-3 h-3 rounded-full ${
                      isOnline ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                  </td>
                  <td className="p-4 text-white font-medium">{node.name}</td>
                  <td className="p-4 text-white/70">{node.region}</td>
                  <td className="p-4 text-white">
                    {status ? `${status.cpu.usage.toFixed(1)}%` : '--'}
                  </td>
                  <td className="p-4 text-white">
                    {status ? `${((status.ram.used / status.ram.total) * 100).toFixed(1)}%` : '--'}
                  </td>
                  <td className="p-4 text-white">
                    {status ? `${((status.disk.used / status.disk.total) * 100).toFixed(1)}%` : '--'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}