'use client';

import { useCallback } from 'react';
import { useWorkoutStore } from '@/stores/workoutStore';
import type { WorkoutExercise } from '@/lib/types';

/**
 * Hook que encapsula ações do workout com useCallback
 * Para uso no page.tsx
 */
export function useWorkoutActions() {
  const {
    loadTemplateByName,
    toggleExerciseComplete,
    updateExercise,
    saveExerciseToTemplate,
    finishWorkout,
  } = useWorkoutStore();

  const handleLoadTemplate = useCallback(async (templateName: string) => {
    await loadTemplateByName(templateName);
  }, [loadTemplateByName]);

  const handleToggleComplete = useCallback((order: number) => {
    toggleExerciseComplete(order);
  }, [toggleExerciseComplete]);

  const handleUpdateExercise = useCallback((order: number, updates: Partial<WorkoutExercise>) => {
    updateExercise(order, updates);
  }, [updateExercise]);

  const handleSaveToTemplate = useCallback(async (
    templateId: number,
    order: number,
    updates: Partial<WorkoutExercise>
  ) => {
    await saveExerciseToTemplate(templateId, order, updates);
  }, [saveExerciseToTemplate]);

  const handleFinishWorkout = useCallback(async () => {
    await finishWorkout();
  }, [finishWorkout]);

  return {
    handleLoadTemplate,
    handleToggleComplete,
    handleUpdateExercise,
    handleSaveToTemplate,
    handleFinishWorkout,
  };
}
