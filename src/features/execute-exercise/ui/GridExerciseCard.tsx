// features/execute-exercise/ui/GridExerciseCard.tsx
import type { WorkoutExercise } from '@/entities/exercise/model/types'
import { Card } from '@/shared/ui/Card'

interface GridExerciseCardProps {
  exercise: WorkoutExercise
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function GridExerciseCard({ exercise, onClick, disabled = false, className = '' }: GridExerciseCardProps) {
  let cardClass = 'p-4 transition-shadow ' + className;
  if (disabled) {
    cardClass += ' opacity-50 cursor-not-allowed pointer-events-none';
  } else {
    cardClass += ' cursor-pointer hover:shadow-md';
  }

  return (
    <Card className={cardClass} aria-disabled={disabled} onClick={onClick}>
      <div className="text-center">
        <div className="font-bold text-lg">#{exercise.exerciseNumber} {exercise.exerciseName}</div>
        <div className="text-sm opacity-70 mt-2">{exercise.sets}×{exercise.reps} • {exercise.weight}kg</div>
      </div>
    </Card>
  )
}