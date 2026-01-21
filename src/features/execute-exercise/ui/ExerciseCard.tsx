// features/execute-exercise/ui/ExerciseCard.tsx
import { LuSettings, LuClock } from 'react-icons/lu'
import type { WorkoutExercise } from '@/entities/exercise/model/types'
import { useExerciseExecution } from '../model/useExerciseExecution'
import { SetIndicator } from './SetIndicator'
import { ExecutionControls } from './ExecutionControls'
import { RestTimer } from '@/features/track-rest/ui/RestTimer'
import { formatTotalTime } from '@/shared/lib/formatTime'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'

interface ExerciseCardProps {
  exercise: WorkoutExercise
  onEdit?: () => void
  onClose?: () => void
}

export function ExerciseCard({ exercise, onEdit, onClose }: ExerciseCardProps) {
  const {
    exercise: currentExercise,
    handleStart,
    handleCompleteSet,
    handlePause,
    handleResume,
    handleStartRest
  } = useExerciseExecution(exercise)

  const showRestTimer = currentExercise.status === 'resting'

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">#{currentExercise.exerciseNumber}</span>
          <span className="text-lg">{currentExercise.exerciseName}</span>
        </div>
        <div className="flex items-center gap-2">
          {currentExercise.startTime && (
            <div className="flex items-center gap-1 text-sm opacity-70">
              <LuClock className="text-lg" />
              {formatTotalTime(currentExercise.totalDuration)}
            </div>
          )}
          {onEdit && (
            <Button
              onClick={onEdit}
              variant="ghost"
              size="sm"
              leftIcon={<LuSettings className="text-lg" />}
            >
              Editar
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <SetIndicator exercise={currentExercise} />
      </div>

      {/* Configuration Info */}
      <div className="text-center mb-6 text-sm opacity-70">
        {currentExercise.sets}×{currentExercise.reps} • {currentExercise.weight}kg • Descanso {currentExercise.restTime}s
      </div>

      {/* Rest Timer */}
      {showRestTimer && (
        <div className="mb-6">
          <RestTimer
            restTime={currentExercise.restTime}
            onRestComplete={handleStartRest}
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center">
        <ExecutionControls
          exercise={currentExercise}
          onStart={handleStart}
          onCompleteSet={handleCompleteSet}
          onPause={handlePause}
          onResume={handleResume}
        />
      </div>

      {/* Close Button */}
      {onClose && (
        <div className="flex justify-center mt-4">
          <Button onClick={onClose} variant="ghost" size="sm">
            Fechar
          </Button>
        </div>
      )}
    </Card>
  )
}