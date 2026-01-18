import type { WorkoutExercise } from '../lib/types'

interface ExerciseCardProps {
  exercise: WorkoutExercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="exercise-card">
      <div className="exercise-card-number">
        {exercise.exerciseNumber.toString().padStart(2, '0')}
      </div>
      <div className="exercise-card-name">
        {exercise.exerciseName}
      </div>
      <div className="exercise-card-sets">
        {exercise.sets}×{exercise.reps}
      </div>
    </div>
  )
}
