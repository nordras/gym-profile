"use client";

import { useMemo } from 'react';
import ExerciseCard from './ExerciseCard';
import type { WorkoutExercise } from '@/lib/types';

interface WorkoutChecklistProps {
  exercises: WorkoutExercise[];
  originalExercises?: WorkoutExercise[];
  onToggleComplete: (order: number) => void;
  onSaveExerciseChanges: (
    order: number,
    updates: Partial<WorkoutExercise>,
    saveToTemplate: boolean
  ) => void;
  onFinishWorkout: () => void;
}

export default function WorkoutChecklist({
  exercises,
  originalExercises = [],
  onToggleComplete,
  onSaveExerciseChanges,
  onFinishWorkout,
}: WorkoutChecklistProps) {
  const sortedExercises = useMemo(() => {
    return [...exercises].sort((a, b) => a.order - b.order);
  }, [exercises]);

  const completedCount = useMemo(() => {
    return exercises.filter(ex => ex.completed).length;
  }, [exercises]);

  const totalCount = exercises.length;

  return (
    <div className="space-y-4">
      {/* Barra de Progresso */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Progresso</span>
            <span className="text-sm">
              {completedCount}/{totalCount} exercícios
            </span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={completedCount}
            max={totalCount}
          ></progress>
        </div>
      </div>

      {/* Lista de Exercícios */}
      <div className="space-y-3">
        {sortedExercises.map((exercise) => {
          const original = originalExercises.find(o => o.order === exercise.order);
          
          return (
            <ExerciseCard
              key={`exercise-${exercise.exerciseId}-${exercise.order}`}
              exercise={exercise}
              originalExercise={original}
              onToggleComplete={() => onToggleComplete(exercise.order)}
              onSaveChanges={(updates, saveToTemplate) => {
                onSaveExerciseChanges(exercise.order, updates, saveToTemplate);
              }}
            />
          );
        })}
      </div>

      {/* Botão Finalizar Treino */}
      {exercises.length > 0 && (
        <div className="flex justify-center pt-4">
          <button
            className="btn btn-primary btn-wide"
            onClick={onFinishWorkout}
            disabled={completedCount === 0}
          >
            🏁 Finalizar Treino
          </button>
        </div>
      )}
    </div>
  );
}
