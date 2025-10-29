'use client'
import { useEffect } from 'react'

export default function TrackerClient() {
  useEffect(() => {
    (async () => {
      try {
        const { initAutoTracking } = await import('@/lib/tracker/tracker.js')
        await initAutoTracking()
      } catch (e) {
        console.warn('tracker init failed', e)
      }
    })()
  }, [])

  return null
}