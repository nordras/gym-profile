// features/track-rest/model/useRestTimer.ts
import { useState, useEffect, useCallback } from 'react'

interface UseRestTimerProps {
  totalTime: number  // segundos
  onComplete: () => void
  autoStart?: boolean
}

export function useRestTimer({
  totalTime,
  onComplete,
  autoStart = true
}: UseRestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(totalTime)
  const [isActive, setIsActive] = useState(autoStart)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isActive || isPaused || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          onComplete()
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, isPaused, timeRemaining, onComplete])

  const start = useCallback(() => {
    setIsActive(true)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  const skip = useCallback(() => {
    setTimeRemaining(0)
    setIsActive(false)
    onComplete()
  }, [onComplete])

  const reset = useCallback(() => {
    setTimeRemaining(totalTime)
    setIsActive(false)
    setIsPaused(false)
  }, [totalTime])

  const percentage = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0

  return {
    timeRemaining,
    isActive,
    isPaused,
    percentage,
    start,
    pause,
    resume,
    skip,
    reset,
  }
}