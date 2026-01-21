// entities/exercise/model/types.ts
export interface Exercise {
  id: number
  number: number  // 1-67
  name: string
}

export interface SetTiming {
  setNumber: number
  startTime: Date
  endTime: Date | null
  duration: number  // segundos
  restAfter: number // segundos de descanso após esta série
}

export type ExerciseStatus =
  | 'not_started'
  | 'executing'
  | 'resting'
  | 'paused'
  | 'completed'

export interface WorkoutExercise {
  // Identificação
  id: number
  exerciseId: number
  exerciseNumber: number
  exerciseName: string
  order: number

  // Configuração
  sets: number
  reps: number
  weight: number
  restTime: number  // segundos

  // Estado de execução
  status: ExerciseStatus
  currentSet: number

  // Timers
  startTime: Date | null
  endTime: Date | null
  totalDuration: number  // segundos totais

  // Detalhes das séries
  setTimings: SetTiming[]
}