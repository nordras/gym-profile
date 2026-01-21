import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExerciseCard } from '@/features/execute-exercise'
import type { WorkoutExercise } from '@/entities/exercise/model/types'

  // Template Treino A - Membros Superiores (será migrado para DB)
const TREINO_A_EXERCISES: WorkoutExercise[] = [
  {
    id: 17,
    exerciseId: 17,
    exerciseNumber: 17,
    exerciseName: 'Supino Vertical Máquina',
    order: 1,
    sets: 3,
    reps: 15,
    weight: 20.5,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 18,
    exerciseId: 18,
    exerciseNumber: 18,
    exerciseName: 'Peck Deck',
    order: 2,
    sets: 3,
    reps: 15,
    weight: 25.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 1,
    exerciseId: 1,
    exerciseNumber: 1,
    exerciseName: 'Pulley Alto',
    order: 3,
    sets: 3,
    reps: 12,
    weight: 30.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 7,
    exerciseId: 7,
    exerciseNumber: 7,
    exerciseName: 'Remada Baixa Máquina',
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
    id: 4,
    exerciseId: 4,
    exerciseNumber: 4,
    exerciseName: 'Remada Simetria',
    order: 5,
    sets: 3,
    reps: 10,
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
    id: 24,
    exerciseId: 24,
    exerciseNumber: 24,
    exerciseName: 'Bíceps Life',
    order: 6,
    sets: 3,
    reps: 10,
    weight: 15.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 21,
    exerciseId: 21,
    exerciseNumber: 21,
    exerciseName: 'Cross Over',
    order: 7,
    sets: 3,
    reps: 8,
    weight: 22.5,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
  {
    id: 5,
    exerciseId: 5,
    exerciseNumber: 5,
    exerciseName: 'Elevação Lateral Máquina',
    order: 8,
    sets: 3,
    reps: 8,
    weight: 18.0,
    restTime: 40,
    status: 'not_started',
    currentSet: 0,
    startTime: null,
    endTime: null,
    totalDuration: 0,
    setTimings: []
  },
]

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

  const exercises = workout === 'A' ? TREINO_A_EXERCISES : TREINO_B_EXERCISES

  return (
    <motion.section
      className="page-section"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="page-container-lg">
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

        <div className="grid grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.exerciseId} exercise={exercise} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
