import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExerciseCard } from '@/features/execute-exercise'
import { GridExerciseCard } from '@/features/execute-exercise/ui/GridExerciseCard'
import type { WorkoutExercise } from '@/entities/exercise/model/types'
import { useWorkout } from '@/shared/lib/workoutContext'

export default function WorkoutPage() {
  const navigate = useNavigate()
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)
  const { selectedWorkout, currentExercises, handleWorkoutChange, pendingExercises, completedExercises, setCurrentExercises } = useWorkout()

  const selectedExercise = selectedExerciseId ? currentExercises.find(e => e.exerciseId === selectedExerciseId) : null

  // Selecionar exercício ao clicar
  const handleExerciseClick = (exercise: WorkoutExercise) => {
    if (exercise.status === 'completed') return;
    setSelectedExerciseId(exercise.exerciseId);
  }

  // Atualizar exercício (ex: marcar como completed)
  const handleUpdateExercise = (updatedExercise: WorkoutExercise) => {
    setCurrentExercises((prev: WorkoutExercise[]) => prev.map((e: WorkoutExercise) => e.exerciseId === updatedExercise.exerciseId ? updatedExercise : e))
  }

  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="page-container-lg flex flex-col h-full">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/')}
            className="btn-back"
          >
            ←
          </button>
          {/* Seletor de treino */}
          <div className="flex gap-2">
            <button
              className={`btn btn-sm ${selectedWorkout === 'A' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => {
                handleWorkoutChange('A')
                setSelectedExerciseId(null)
              }}
              disabled={selectedWorkout === 'A'}
            >
              Treino A
            </button>
            <button
              className={`btn btn-sm ${selectedWorkout === 'B' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => {
                handleWorkoutChange('B')
                setSelectedExerciseId(null)
              }}
              disabled={selectedWorkout === 'B'}
            >
              Treino B
            </button>
          </div>
          <div className="page-header ml-4">
            <h1 className="page-title">TREINO {selectedWorkout}</h1>
            <p className="text-xs opacity-60 mt-1">
              {selectedWorkout === 'A' ? 'Membros Superiores' : 'Pernas e Core'}
            </p>
          </div>
        </div>

        {/* Card do exercício aberto no topo */}
        {selectedExercise && (
          <div className="mb-4">
            <ExerciseCard 
              exercise={selectedExercise} 
              isExpanded 
              onClose={() => setSelectedExerciseId(null)}
              onUpdate={handleUpdateExercise}
            />
          </div>
        )}

        {/* Grid dos exercícios pendentes e completos */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {pendingExercises.map((exercise) => (
              <GridExerciseCard 
                key={exercise.exerciseId} 
                exercise={exercise} 
                onClick={() => handleExerciseClick(exercise)}
                disabled={selectedExerciseId === exercise.exerciseId}
                className={selectedExerciseId === exercise.exerciseId ? 'opacity-50 pointer-events-none' : ''}
              />
            ))}
            {completedExercises.map((exercise) => (
              <GridExerciseCard 
                key={exercise.exerciseId} 
                exercise={exercise} 
                disabled
                className="bg-blue-100 text-blue-700 opacity-60 pointer-events-none"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
