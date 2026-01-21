// features/execute-exercise/ui/ExecutionControls.tsx
import { LuPlay, LuPause, LuCheck } from 'react-icons/lu'
import type { WorkoutExercise } from '@/entities/exercise/model/types'
import { Button } from '@/shared/ui/Button'

interface ExecutionControlsProps {
  exercise: WorkoutExercise
  onStart: () => void
  onCompleteSet: () => void
  onPause: () => void
  onResume: () => void
}

export function ExecutionControls({
  exercise,
  onStart,
  onCompleteSet,
  onPause,
  onResume
}: ExecutionControlsProps) {
  const { status, sets } = exercise

  if (status === 'not_started') {
    return (
      <Button
        onClick={onStart}
        variant="primary"
        size="lg"
        wide
        leftIcon={<LuPlay className="text-2xl" />}
      >
        COMEÇAR EXERCÍCIO
      </Button>
    )
  }

  if (status === 'executing') {
    return (
      <div className="flex gap-2">
        <Button
          onClick={onPause}
          variant="outline"
          size="lg"
          className="flex-1"
          leftIcon={<LuPause className="text-xl" />}
        >
          PAUSAR
        </Button>
        <Button
          onClick={onCompleteSet}
          variant="primary"
          size="lg"
          className="flex-1"
          leftIcon={<LuCheck className="text-xl" />}
        >
          FINALIZAR SÉRIE
        </Button>
      </div>
    )
  }

  if (status === 'paused') {
    return (
      <div className="flex gap-2">
        <Button
          onClick={onResume}
          variant="primary"
          size="lg"
          className="flex-1"
          leftIcon={<LuPlay className="text-xl" />}
        >
          RETOMAR
        </Button>
        <Button
          onClick={onCompleteSet}
          variant="outline"
          size="lg"
          className="flex-1"
          leftIcon={<LuCheck className="text-xl" />}
        >
          FINALIZAR SÉRIE
        </Button>
      </div>
    )
  }

  if (status === 'completed') {
    return (
      <div className="text-center">
        <div className="text-success text-lg font-semibold mb-2">
          ✅ EXERCÍCIO COMPLETO
        </div>
        <div className="text-sm opacity-70">
          {sets} séries concluídas
        </div>
      </div>
    )
  }

  return null
}