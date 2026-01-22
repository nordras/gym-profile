import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExerciseCard } from '@/features/execute-exercise'
import { GridExerciseCard } from '@/features/execute-exercise/ui/GridExerciseCard'
import type { WorkoutExercise } from '@/entities/exercise/model/types'
import { TREINO_A_EXERCISES } from '@/data/workoutTemplates'

// Template Treino B - Pernas e Core TODO migrar para DB
const TREINO_B_EXERCISES: WorkoutExercise[] = [
  {
    id: 44,
    exerciseId: 44,
    exerciseNumber: 44,
    exerciseName: 'Leg Horizontal',
    order: 1,
    sets: 3,
    reps: 15,
    weight: 45.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 36,
    exerciseId: 36,
    exerciseNumber: 36,
    exerciseName: 'Cadeira Extensora',
    order: 2,
    sets: 3,
    reps: 15,
    weight: 40.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 40,
    exerciseId: 40,
    exerciseNumber: 40,
    exerciseName: 'Mesa Flexora',
    order: 3,
    sets: 3,
    reps: 12,
    weight: 50.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 45,
    exerciseId: 45,
    exerciseNumber: 45,
    exerciseName: 'Cadeira Abdutora',
    order: 4,
    sets: 3,
    reps: 12,
    weight: 35.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 46,
    exerciseId: 46,
    exerciseNumber: 46,
    exerciseName: 'Cadeira Adutora',
    order: 5,
    sets: 3,
    reps: 10,
    weight: 38.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 64,
    exerciseId: 64,
    exerciseNumber: 64,
    exerciseName: 'Máquina Lombar',
    order: 6,
    sets: 3,
    reps: 10,
    weight: 55.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 62,
    exerciseId: 62,
    exerciseNumber: 62,
    exerciseName: 'Panturrilha em Pé',
    order: 7,
    sets: 3,
    reps: 8,
    weight: 60.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 61,
    exerciseId: 61,
    exerciseNumber: 61,
    exerciseName: 'Banco Panturrilha',
    order: 8,
    sets: 3,
    reps: 8,
    weight: 65.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
]

export default function WorkoutPage() {
  const { workout } = useParams<{ workout: string }>()
  const navigate = useNavigate()
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)

  const initialExercises = workout === 'A' ? TREINO_A_EXERCISES : TREINO_B_EXERCISES
  const [currentExercises, setCurrentExercises] = useState<WorkoutExercise[]>(initialExercises)
  const selectedExercise = selectedExerciseId ? currentExercises.find(e => e.exerciseId === selectedExerciseId) : null

  // Exercícios pendentes (não completed)
  const pendingExercises = currentExercises.filter(e => e.status !== 'completed')
  // Exercícios completos
  const completedExercises = currentExercises.filter(e => e.status === 'completed')

  // Selecionar exercício ao clicar
  const handleExerciseClick = (exercise: WorkoutExercise) => {
    if (exercise.status === 'completed') return;
    setSelectedExerciseId(exercise.exerciseId);
  }

  // Atualizar exercício (ex: marcar como completed)
  const handleUpdateExercise = (updatedExercise: WorkoutExercise) => {
    setCurrentExercises(prev => prev.map(e => e.exerciseId === updatedExercise.exerciseId ? updatedExercise : e))
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="btn-back"
          >
            ←
          </button>
          <div className="page-header">
            <h1 className="page-title">TREINO {workout}</h1>
            <p className="text-xs opacity-60 mt-1">
              {workout === 'A' ? 'Membros Superiores' : 'Pernas e Core'}
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
