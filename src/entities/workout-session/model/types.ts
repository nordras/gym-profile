// entities/workout-session/model/types.ts
import type { WorkoutExercise } from '@/entities/exercise/model/types'

export interface WorkoutTemplate {
  id: number
  name: string
  exercises: WorkoutExercise[]
}

export interface WorkoutSession {
  id: number
  templateId: number
  templateName: string
  startTime: Date
  endTime: Date | null
  duration: number  // minutos
  exercises: WorkoutExercise[]
}