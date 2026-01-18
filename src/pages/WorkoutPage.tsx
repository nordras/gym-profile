import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { WorkoutExercise } from '../lib/types'
import ExerciseCard from '../components/ExerciseCard'

  // Template Treino A - Membros Superiores (será migrado para DB)
const TREINO_A_EXERCISES: WorkoutExercise[] = [
  { exerciseId: 17, exerciseNumber: 17, exerciseName: 'Supino Vertical Máquina', order: 1, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 18, exerciseNumber: 18, exerciseName: 'Peck Deck', order: 2, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 1, exerciseNumber: 1, exerciseName: 'Pulley Alto', order: 3, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 7, exerciseNumber: 7, exerciseName: 'Remada Baixa Máquina', order: 4, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 4, exerciseNumber: 4, exerciseName: 'Remada Simetria', order: 5, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 24, exerciseNumber: 24, exerciseName: 'Bíceps Life', order: 6, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 21, exerciseNumber: 21, exerciseName: 'Cross Over', order: 7, sets: 3, reps: 8, weight: 0, completed: false },
  { exerciseId: 5, exerciseNumber: 5, exerciseName: 'Elevação Lateral Máquina', order: 8, sets: 3, reps: 8, weight: 0, completed: false },
]

// Template Treino B - Pernas e Core TODO migrar para DB
const TREINO_B_EXERCISES: WorkoutExercise[] = [
  { exerciseId: 44, exerciseNumber: 44, exerciseName: 'Leg Horizontal', order: 1, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 36, exerciseNumber: 36, exerciseName: 'Cadeira Extensora', order: 2, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 40, exerciseNumber: 40, exerciseName: 'Mesa Flexora', order: 3, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 45, exerciseNumber: 45, exerciseName: 'Cadeira Abdutora', order: 4, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 46, exerciseNumber: 46, exerciseName: 'Cadeira Adutora', order: 5, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 64, exerciseNumber: 64, exerciseName: 'Máquina Lombar', order: 6, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 62, exerciseNumber: 62, exerciseName: 'Panturrilha em Pé', order: 7, sets: 3, reps: 8, weight: 0, completed: false },
  { exerciseId: 61, exerciseNumber: 61, exerciseName: 'Banco Panturrilha', order: 8, sets: 3, reps: 8, weight: 0, completed: false },
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
