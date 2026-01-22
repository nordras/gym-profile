// features/execute-exercise/ui/SetIndicator.tsx
import { LuCheck, LuPlay, LuCircle, LuClock } from 'react-icons/lu'
import type { WorkoutExercise } from '@/entities/exercise/model/types'

interface SetIndicatorProps {
  exercise: WorkoutExercise
}

export function SetIndicator({ exercise }: SetIndicatorProps) {
  const { sets, currentSet, status, setTimings } = exercise

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: sets }).map((_, i) => {
        const setNum = i + 1
        const isCompleted = setNum < currentSet
        const isCurrent = setNum === currentSet && status !== 'completed'
        const isResting = isCurrent && status === 'resting'

        const setTiming = setTimings.find((st) => st.setNumber === setNum)
        const duration = setTiming?.duration || 0

        return (
          <div
            key={setNum}
            className={`
              flex flex-col items-center gap-1 p-3 rounded-lg min-w-20
              ${isCurrent ? 'bg-primary/20 ring-2 ring-primary' : ''}
              ${isCompleted ? 'bg-success/20' : 'bg-base-200'}
              ${isResting ? 'bg-warning/20' : ''}
            `}
          >
            {isCompleted && <LuCheck className="text-success text-2xl" />}
            {isCurrent && status === 'executing' && <LuPlay className="text-primary text-2xl" />}
            {isCurrent && status === 'resting' && <LuClock className="text-warning text-2xl" />}
            {!isCompleted && !isCurrent && <LuCircle className="text-base-content/30 text-2xl" />}

            <span className="text-xs font-semibold">
              Série {setNum}
            </span>

            {isCompleted && duration > 0 && (
              <span className="text-xs opacity-60">{duration}s</span>
            )}
          </div>
        )
      })}
    </div>
  )
}