'use client';

import { useWorkoutTimer } from '@/hooks/useWorkoutTimer';

interface WorkoutTimerProps {
  startTime: Date | null;
}

export default function WorkoutTimer({ startTime }: WorkoutTimerProps) {
  const { formattedTime } = useWorkoutTimer(startTime);

  if (!startTime) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Tempo:</span>
      <div className="badge badge-lg badge-neutral font-mono">
        ⏱️ {formattedTime}
      </div>
    </div>
  );
}
