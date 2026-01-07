"use client";

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { initializeDatabase } from '@/lib/db';
import { useWorkoutStore } from '@/stores/workoutStore';
import WorkoutChecklist from '@/components/workout/WorkoutChecklist';
import WorkoutTimer from '@/components/workout/WorkoutTimer';
import ExerciseSkeleton from '@/components/workout/ExerciseSkeleton';
import ToastContainer from '@/components/workout/ToastContainer';
import { MESSAGES } from '@/lib/constants';

export default function HomePage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const {
    currentTemplate,
    currentExercises,
    originalExercises,
    startTime,
    isWorkoutActive,
    loadTemplateByName,
    toggleExerciseComplete,
    updateExercise,
    saveExerciseToTemplate,
    finishWorkout,
  } = useWorkoutStore();

  // Inicializar banco de dados na montagem
  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        setIsInitialized(true);
      } catch (error) {
        console.error('Erro ao inicializar:', error);
      }
    };
    init();
  }, []);

  const handleLoadTemplate = useCallback(async (templateName: string) => {
    try {
      await loadTemplateByName(templateName);
      setSelectedTemplate(templateName);
      toast.success(`${templateName} carregado!`);
    } catch (error) {
      console.error('Erro ao carregar template:', error);
      toast.error(MESSAGES.TEMPLATE_LOAD_ERROR);
    }
  }, [loadTemplateByName]);

  const handleSaveExerciseChanges = useCallback(async (
    order: number,
    updates: Partial<import('@/lib/types').WorkoutExercise>,
    saveToTemplate: boolean
  ) => {
    // Atualizar exercício no estado atual
    updateExercise(order, updates);

    // Se solicitado, salvar no template original
    if (saveToTemplate && currentTemplate?.id) {
      try {
        await saveExerciseToTemplate(currentTemplate.id, order, updates);
        toast.success(MESSAGES.TEMPLATE_UPDATED);
      } catch (error) {
        toast.error(MESSAGES.EXERCISE_SAVE_ERROR);
      }
    } else {
      toast.success(MESSAGES.SESSION_ONLY);
    }
  }, [currentTemplate, updateExercise, saveExerciseToTemplate]);

  const handleFinishWorkout = useCallback(async () => {
    try {
      await finishWorkout();
      setSelectedTemplate('');
      toast.success(MESSAGES.WORKOUT_FINISHED);
    } catch (error) {
      console.error('Erro ao finalizar treino:', error);
      toast.error(MESSAGES.WORKOUT_FINISH_ERROR);
    }
  }, [finishWorkout]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto max-w-2xl p-4">
          <div className="text-center py-6">
            <h1 className="text-4xl font-bold">🏋️ Gym Profile</h1>
            <p className="text-gray-600 mt-2">Inicializando...</p>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <ExerciseSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-200">
      <ToastContainer />
      <section className="container mx-auto max-w-2xl p-4">
        {/* Header */}
        <section className="text-center py-6">
          <h1 className="text-4xl font-bold">🏋️ Gym Profile</h1>
          <p className="text-gray-600 mt-2">Seu treino personalizado</p>
        </section>

        {!isWorkoutActive && (
          <section className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title">Selecione seu treino</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  className="btn btn-lg btn-primary"
                  onClick={() => handleLoadTemplate('Treino A')}
                >
                  🔴 Treino A
                  <span className="text-xs">Membros Superiores</span>
                </button>
                <button
                  className="btn btn-lg btn-secondary"
                  onClick={() => handleLoadTemplate('Treino B')}
                >
                  🔵 Treino B
                  <span className="text-xs">Pernas e Core</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Treino Ativo */}
        {isWorkoutActive && currentTemplate && (
          <section>
            <div className="card bg-base-100 shadow-md mb-4">
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">
                    {currentTemplate.name === 'Treino A' ? '🔴' : '🔵'}{' '}
                    {currentTemplate.name}
                  </h2>
                  <WorkoutTimer startTime={startTime} />
                </div>
                <div className="flex gap-2">
                  <div className="badge badge-info">
                    Intervalo: {currentTemplate.intervalSeconds || 40}s
                  </div>
                </div>
              </div>
            </div>

            <WorkoutChecklist
              exercises={currentExercises}
              originalExercises={originalExercises}
              onToggleComplete={toggleExerciseComplete}
              onSaveExerciseChanges={handleSaveExerciseChanges}
              onFinishWorkout={handleFinishWorkout}
            />
          </section>
        )}

        {/* Mensagem quando nenhum treino está ativo */}
        {!isWorkoutActive && !currentTemplate && (
          <section className="text-center py-12 text-gray-500">
            <p className="text-lg">Selecione um treino para começar</p>
          </section>
        )}
      </section>
    </main>
  );
}
