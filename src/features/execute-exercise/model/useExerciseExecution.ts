// features/execute-exercise/model/useExerciseExecution.ts
import { useState, useCallback } from 'react'
import type { WorkoutExercise } from '@/entities/exercise/model/types'
import {
  startExercise,
  completeSet,
  pauseExercise,
  resumeExercise,
  startRest
} from '../lib/exerciseLogic'

export function useExerciseExecution(initialExercise: WorkoutExercise) {
  const [exercise, setExercise] = useState(initialExercise)

  const handleStart = useCallback(() => {
    setExercise((prev: WorkoutExercise) => startExercise(prev))
  }, [])

  const handleCompleteSet = useCallback(() => {
    setExercise((prev: WorkoutExercise) => completeSet(prev))
  }, [])

  const handlePause = useCallback(() => {
    setExercise((prev: WorkoutExercise) => pauseExercise(prev))
  }, [])

  const handleResume = useCallback(() => {
    setExercise((prev: WorkoutExercise) => resumeExercise(prev))
  }, [])

  const handleStartRest = useCallback(() => {
    setExercise((prev: WorkoutExercise) => startRest(prev))
  }, [])

  return {
    exercise,
    handleStart,
    handleCompleteSet,
    handlePause,
    handleResume,
    handleStartRest,
  }
}