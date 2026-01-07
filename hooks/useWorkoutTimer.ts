'use client';

import { useState, useEffect } from 'react';
import { calculateElapsedTime, formatElapsedTime } from '@/lib/helpers';

interface UseWorkoutTimerReturn {
  elapsedSeconds: number;
  formattedTime: string;
}

/**
 * Hook para gerenciar timer de treino
 * Calcula tempo decorrido desde startTime
 */
export function useWorkoutTimer(startTime: Date | null): UseWorkoutTimerReturn {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!startTime) {
      setElapsedSeconds(0);
      return;
    }

    // Atualizar imediatamente
    setElapsedSeconds(calculateElapsedTime(startTime));

    // Atualizar a cada segundo
    const interval = setInterval(() => {
      setElapsedSeconds(calculateElapsedTime(startTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return {
    elapsedSeconds,
    formattedTime: formatElapsedTime(elapsedSeconds),
  };
}
