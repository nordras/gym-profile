import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { WorkoutExercise } from '@/entities/exercise/model/types'
import { TREINO_A_EXERCISES, TREINO_B_EXERCISES } from '@/data/workoutTemplates'

interface WorkoutContextType {
  selectedWorkout: string
  currentExercises: WorkoutExercise[]
  setSelectedWorkout: (workout: string) => void
  setCurrentExercises: React.Dispatch<React.SetStateAction<WorkoutExercise[]>>
  handleWorkoutChange: (workout: string) => void
  pendingExercises: WorkoutExercise[]
  completedExercises: WorkoutExercise[]
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

export const useWorkout = () => {
  const context = useContext(WorkoutContext)
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider')
  }
  return context
}

interface WorkoutProviderProps {
  children: ReactNode
  initialWorkout?: string
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({
  children,
  initialWorkout = 'A'
}) => {
  const [selectedWorkout, setSelectedWorkout] = useState<string>(initialWorkout)
  const [currentExercises, setCurrentExercises] = useState<WorkoutExercise[]>(
    initialWorkout === 'A' ? TREINO_A_EXERCISES : TREINO_B_EXERCISES
  )

  const handleWorkoutChange = (workout: string) => {
    setSelectedWorkout(workout)
    setCurrentExercises(workout === 'A' ? TREINO_A_EXERCISES : TREINO_B_EXERCISES)
  }

  const pendingExercises = currentExercises.filter(e => e.status !== 'completed')
  const completedExercises = currentExercises.filter(e => e.status === 'completed')

  const value: WorkoutContextType = {
    selectedWorkout,
    currentExercises,
    setSelectedWorkout,
    setCurrentExercises,
    handleWorkoutChange,
    pendingExercises,
    completedExercises
  }

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  )
}