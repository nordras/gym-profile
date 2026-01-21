// features/execute-exercise/lib/exerciseLogic.ts
import type { WorkoutExercise, SetTiming, ExerciseStatus } from '@/entities/exercise/model/types'
import { calculateDuration } from '@/shared/lib/formatTime'

export function canStartExercise(exercise: WorkoutExercise): boolean {
  return exercise.status === 'not_started'
}

export function canCompleteSet(exercise: WorkoutExercise): boolean {
  return exercise.status === 'executing' && exercise.currentSet <= exercise.sets
}

export function canPause(exercise: WorkoutExercise): boolean {
  return exercise.status === 'executing' || exercise.status === 'resting'
}

export function canResume(exercise: WorkoutExercise): boolean {
  return exercise.status === 'paused'
}

export function startExercise(exercise: WorkoutExercise): WorkoutExercise {
  if (!canStartExercise(exercise)) {
    throw new Error('Cannot start exercise')
  }

  const now = new Date()
  const initialSetTiming: SetTiming = {
    setNumber: 1,
    startTime: now,
    endTime: null,
    duration: 0,
    restAfter: 0
  }

  return {
    ...exercise,
    status: 'executing',
    currentSet: 1,
    startTime: now,
    setTimings: [initialSetTiming]
  }
}

export function completeSet(exercise: WorkoutExercise): WorkoutExercise {
  if (!canCompleteSet(exercise)) {
    throw new Error('Cannot complete set')
  }

  const now = new Date()
  const currentSetTiming = exercise.setTimings[exercise.currentSet - 1]
  const updatedSetTiming: SetTiming = {
    ...currentSetTiming,
    endTime: now,
    duration: calculateDuration(currentSetTiming.startTime, now),
    restAfter: exercise.currentSet < exercise.sets ? exercise.restTime : 0
  }

  const updatedSetTimings = [...exercise.setTimings]
  updatedSetTimings[exercise.currentSet - 1] = updatedSetTiming

  const nextSet = exercise.currentSet + 1
  const isCompleted = nextSet > exercise.sets

  let nextStatus: ExerciseStatus
  let nextSetTiming: SetTiming | undefined

  if (isCompleted) {
    nextStatus = 'completed'
    nextSetTiming = undefined
  } else {
    nextStatus = 'resting'
    nextSetTiming = {
      setNumber: nextSet,
      startTime: now,
      endTime: null,
      duration: 0,
      restAfter: 0
    }
  }

  return {
    ...exercise,
    status: nextStatus,
    currentSet: nextSet,
    endTime: isCompleted ? now : null,
    totalDuration: isCompleted ? calculateDuration(exercise.startTime!, now) : exercise.totalDuration,
    setTimings: nextSetTiming ? [...updatedSetTimings, nextSetTiming] : updatedSetTimings
  }
}

export function pauseExercise(exercise: WorkoutExercise): WorkoutExercise {
  if (!canPause(exercise)) {
    throw new Error('Cannot pause exercise')
  }

  return {
    ...exercise,
    status: 'paused'
  }
}

export function resumeExercise(exercise: WorkoutExercise): WorkoutExercise {
  if (!canResume(exercise)) {
    throw new Error('Cannot resume exercise')
  }

  return {
    ...exercise,
    status: exercise.currentSet <= exercise.sets ? 'executing' : 'completed'
  }
}

export function startRest(exercise: WorkoutExercise): WorkoutExercise {
  if (exercise.status !== 'resting') {
    throw new Error('Exercise is not in resting state')
  }

  return {
    ...exercise,
    status: 'executing'
  }
}