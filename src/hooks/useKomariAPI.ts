import { useState, useEffect } from 'react'
import type { Node, NodeStatus } from '../types'

export function useKomariAPI() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wsConnected, setWsConnected] = useState(false)
  const [isReconnecting, setIsReconnecting] = useState(false)

  useEffect(() => {
    fetchNodes()
    const cleanup = setupWebSocket()
    
    // 监听网络状态变化
    const handleOnline = () => {
      console.log('Network reconnected, reestablishing connections...')
      fetchNodes()
      cleanup()
      setupWebSocket()
    }
    
    window.addEventListener('online', handleOnline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      cleanup()
    }
  }, [])

  const fetchNodes = async () => {
    try {
      const response = await fetch('/api/nodes')
      const data = await response.json()
      
      if (data.status === 'success') {
        setNodes(data.data)
      } else {
        setError(data.message || 'Failed to fetch nodes')
      }
    } catch (err) {
      setError('Network error while fetching nodes')
      console.error('Error fetching nodes:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const setupWebSocket = () => {
    let ws: WebSocket | null = null
    let interval: number | null = null
    let reconnectTimeout: number | null = null
    let reconnectAttempts = 0
    const maxReconnectAttempts = 10
    
    const connect = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        const wsUrl = `${protocol}//${window.location.host}/api/clients`
        
        ws = new WebSocket(wsUrl)
        
        ws.onopen = () => {
          console.log('WebSocket connected')
          setWsConnected(true)
          setIsReconnecting(false)
          reconnectAttempts = 0
          ws?.send('get')
          
          // 设置定期更新
          interval = window.setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
              ws.send('get')
            }
          }, 3000)
        }
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.status === 'success' && data.data) {
              setNodeStatuses(data.data.data || {})
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error)
          }
        }
        
        ws.onclose = () => {
          console.log('WebSocket disconnected')
          setWsConnected(false)
          
          if (interval) {
            clearInterval(interval)
            interval = null
          }
          
          // 自动重连
          if (reconnectAttempts < maxReconnectAttempts) {
            setIsReconnecting(true)
            reconnectTimeout = window.setTimeout(() => {
              reconnectAttempts++
              connect()
            }, Math.min(1000 * Math.pow(2, reconnectAttempts), 30000))
          }
        }
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error)
        }
        
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error)
      }
    }
    
    connect()
    
    return () => {
      if (ws) {
        ws.close()
      }
      if (interval) {
        clearInterval(interval)
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
    }
  }

  // 获取节点历史数据
  const fetchNodeHistory = async (nodeId: string, hours: number = 24) => {
    try {
      const response = await fetch(`/api/records/load?uuid=${nodeId}&hours=${hours}`)
      const result = await response.json()
      
      if (result.status === 'success') {
        return result.data
      } else {
        throw new Error(result.message || 'Failed to fetch history')
      }
    } catch (error) {
      console.error('Error fetching node history:', error)
      throw error
    }
  }

  return {
    nodes,
    nodeStatuses,
    isLoading,
    error,
    wsConnected,
    isReconnecting,
    fetchNodeHistory
  }
}