import { motion } from 'framer-motion'
import type { Node, NodeStatus } from '../types'

interface NodeGridProps {
  nodes: Node[]
  nodeStatuses: Record<string, NodeStatus>
  onNodeClick: (nodeId: string) => void
}

export function NodeGrid({ nodes, nodeStatuses, onNodeClick }: NodeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nodes.map((node, index) => {
        const status = nodeStatuses[node.uuid]
        const isOnline = !!status
        
        return (
          <motion.div
            key={node.uuid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300"
            onClick={() => onNodeClick(node.uuid)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white truncate">
                {node.name}
              </h3>
              <div className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-green-400 shadow-green-400/50' : 'bg-red-400 shadow-red-400/50'
              } shadow-lg`} />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">CPU</span>
                <span className="text-white">
                  {status ? `${status.cpu.usage.toFixed(1)}%` : '--'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-white/60">内存</span>
                <span className="text-white">
                  {status ? `${((status.ram.used / status.ram.total) * 100).toFixed(1)}%` : '--'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-white/60">磁盘</span>
                <span className="text-white">
                  {status ? `${((status.disk.used / status.disk.total) * 100).toFixed(1)}%` : '--'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-white/60">地区</span>
                <span className="text-white">{node.region}</span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}