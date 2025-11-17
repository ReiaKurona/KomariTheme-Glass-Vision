import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface NodeDetailProps {
  nodeId: string
  onBack: () => void
}

export function NodeDetail({ nodeId, onBack }: NodeDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <motion.button
          onClick={onBack}
          className="glass-button p-2 rounded-lg text-white/70 hover:text-white transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
        </motion.button>
      </div>
      
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-4">节点详情</h2>
        <p className="text-white/60">节点 ID: {nodeId}</p>
        <p className="text-white/60 mt-2">详细信息正在开发中...</p>
      </div>
    </motion.div>
  )
}