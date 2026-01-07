import { db } from './db';
import type { Exercise } from './types';

/**
 * Helper para buscar exercício por número
 * Útil para seeds e validações
 */
export async function getExerciseByNumber(number: number): Promise<Exercise | undefined> {
  return await db.exercises.where('number').equals(number).first();
}

/**
 * Formata número de exercício com padding (ex: 1 -> "01")
 */
export function formatExerciseNumber(num: number): string {
  return String(num).padStart(2, '0');
}

/**
 * Formata duração em minutos para string legível
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Calcula tempo decorrido entre duas datas
 */
export function calculateElapsedTime(startTime: Date): number {
  const now = new Date();
  return Math.floor((now.getTime() - startTime.getTime()) / 1000); // segundos
}

/**
 * Formata segundos para formato MM:SS
 */
export function formatElapsedTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Compara dois exercícios para detectar modificações
 */
export function hasExerciseChanged(
  original: { sets: number; reps: number; weight: number; exerciseId: number },
  current: { sets: number; reps: number; weight: number; exerciseId: number }
): boolean {
  return (
    original.sets !== current.sets ||
    original.reps !== current.reps ||
    original.weight !== current.weight ||
    original.exerciseId !== current.exerciseId
  );
}
