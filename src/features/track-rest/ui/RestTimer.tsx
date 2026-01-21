// features/track-rest/ui/RestTimer.tsx
import { LuClock, LuSkipForward, LuPause, LuPlay } from 'react-icons/lu'
import { useRestTimer } from '../model/useRestTimer'
import { formatRestTime } from '@/shared/lib/formatTime'
import { Button } from '@/shared/ui/Button'

interface RestTimerProps {
  restTime: number
  onRestComplete: () => void
}

export function RestTimer({ restTime, onRestComplete }: RestTimerProps) {
  const {
    timeRemaining,
    isPaused,
    percentage,
    pause,
    resume,
    skip
  } = useRestTimer({
    totalTime: restTime,
    onComplete: onRestComplete
  })

  return (
    <div className="card bg-base-200 border-2 border-primary p-6">
      <div className="text-center space-y-4">
        {/* Timer Display */}
        <div className="flex items-center justify-center gap-3">
          <LuClock className="text-3xl text-primary" />
          <span className="text-5xl font-bold tabular-nums">
            {formatRestTime(timeRemaining)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <progress
            className="progress progress-primary w-full h-4"
            value={percentage}
            max="100"
          />
          <div className="text-sm text-center mt-1 opacity-70">
            {timeRemaining}s restantes de {restTime}s
          </div>
        </div>

        {/* Skip Button */}
        <Button
          onClick={skip}
          variant="ghost"
          size="sm"
          leftIcon={<LuSkipForward className="text-lg" />}
        >
          Pular Descanso
        </Button>

        <div className="divider my-2">ou</div>

        {/* Pause/Resume Button */}
        <Button
          onClick={isPaused ? resume : pause}
          variant="outline"
          size="lg"
          wide
          leftIcon={isPaused ? <LuPlay className="text-xl" /> : <LuPause className="text-xl" />}
        >
          {isPaused ? 'RETOMAR' : 'PAUSAR'} DESCANSO
        </Button>
      </div>
    </div>
  )
}