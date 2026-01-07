'use client';

import { useMemo } from 'react';
import { hasExerciseChanged } from '@/lib/helpers';
import type { WorkoutExercise } from '@/lib/types';

interface ModifiedBadgeProps {
  current: WorkoutExercise;
  original: WorkoutExercise;
}

export default function ModifiedBadge({ current, original }: ModifiedBadgeProps) {
  const isModified = useMemo(() => {
    return hasExerciseChanged(original, current);
  }, [current, original]);

  if (!isModified) return null;

  return (
    <div className="badge badge-warning badge-sm gap-1">
      <span>⚠️</span>
      <span>Modificado</span>
    </div>
  );
}
