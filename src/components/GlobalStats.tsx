import { useMemo } from 'react'
import { useTheme } from '../hooks/useTheme'
import type { Node, NodeStatus } from '../types'

interface GlobalStatsProps {
  nodes: Node[]
  nodeStatuses: Record<string, NodeStatus>
}

export function GlobalStats({ nodes, nodeStatuses }: GlobalStatsProps) {
  const { themeSettings } = useTheme()

  const globalStats = useMemo(() => {
    const onlineNodes = nodes.filter(node => nodeStatuses[node.uuid])
    
    let totalUpSpeed = 0
    let totalDownSpeed = 0
    let totalUpTraffic = 0
    let totalDownTraffic = 0
    
    onlineNodes.forEach(node => {
      const status = nodeStatuses[node.uuid]
      if (status) {
        totalUpSpeed += status.network.up
        totalDownSpeed += status.network.down
        totalUpTraffic += status.network.totalUp
        totalDownTraffic += status.network.totalDown
      }
    })
    
    return {
      totalUpSpeed,
      totalDownSpeed,
      totalUpTraffic,
      totalDownTraffic,
      onlineCount: onlineNodes.length,
      totalCount: nodes.length
    }
  }, [nodes, nodeStatuses])

  const formatSpeed = (bytes: number) => {
    if (themeSettings.speed_unit === 'Mbps') {
      const mbps = (bytes * 8) / (1024 * 1024)
      return `${mbps.toFixed(1)} Mbps`
    } else {
      const mb = bytes / (1024 * 1024)
      return `${mb.toFixed(1)} MB/s`
    }
  }

  const formatTraffic = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024)
    if (gb >= 1024) {
      return `${(gb / 1024).toFixed(1)} TB`
    }
    return `${gb.toFixed(1)} GB`
  }

  if (!themeSettings.show_global_speed && !themeSettings.show_global_traffic) {
    return null
  }

  return (
    <div className="flex items-center space-x-3 text-sm">
      {themeSettings.show_global_speed && (
        <div className="flex items-center space-x-2">
          <span className="text-white/60">网速:</span>
          <span className="text-green-400">↑{formatSpeed(globalStats.totalUpSpeed)}</span>
          <span className="text-blue-400">↓{formatSpeed(globalStats.totalDownSpeed)}</span>
        </div>
      )}
      
      {themeSettings.show_global_traffic && (
        <div className="flex items-center space-x-2">
          <span className="text-white/60">流量:</span>
          <span className="text-white">{formatTraffic(globalStats.totalUpTraffic + globalStats.totalDownTraffic)}</span>
        </div>
      )}
      
      <div className="text-white/60">
        在线: {globalStats.onlineCount}/{globalStats.totalCount}
      </div>
    </div>
  )
}