import { create } from 'zustand';
import { db } from '@/lib/db';
import type { WorkoutTemplate, WorkoutExercise, WorkoutSession } from '@/lib/types';

interface WorkoutStore {
  // Estado atual do treino
  currentTemplate: WorkoutTemplate | null;
  currentExercises: WorkoutExercise[];
  originalExercises: WorkoutExercise[]; // para comparação de modificações
  startTime: Date | null;
  isWorkoutActive: boolean;

  // Ações
  loadTemplate: (templateId: number, dbInstance?: any) => Promise<void>;
  loadTemplateByName: (templateName: string, dbInstance?: any) => Promise<void>;
  toggleExerciseComplete: (order: number) => void;
  updateExercise: (order: number, updates: Partial<WorkoutExercise>) => void;
  saveExerciseToTemplate: (templateId: number, order: number, updates: Partial<WorkoutExercise>, dbInstance?: any) => Promise<void>;
  finishWorkout: (dbInstance?: any) => Promise<void>;
  resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  currentTemplate: null,
  currentExercises: [],
  originalExercises: [],
  startTime: null,
  isWorkoutActive: false,

  /**
   * Carrega um template de treino e inicia sessão
   */
  loadTemplate: async (templateId: number, dbInstance = db) => {
    try {
      const template = await dbInstance.workoutTemplates.get(templateId);
      
      if (!template) {
        throw new Error(`Template ${templateId} não encontrado`);
      }

      // Reseta checkboxes ao iniciar novo treino
      const exercisesWithResetCompletion = template.exercises.map((ex) => ({
        ...ex,
        completed: false,
      }));

      set({
        currentTemplate: template,
        currentExercises: exercisesWithResetCompletion,
        originalExercises: exercisesWithResetCompletion,
        startTime: new Date(),
        isWorkoutActive: true,
      });

      console.log(`Template "${template.name}" carregado`);
    } catch (error) {
      console.error('Erro ao carregar template:', error);
      throw error;
    }
  },

  /**
   * Carrega template pelo nome (ex: "Treino A")
   * Suporta injeção de dependência para testes
   */
  loadTemplateByName: async (templateName: string, dbInstance = db) => {
    try {
      const template = await dbInstance.workoutTemplates
        .where('name')
        .equals(templateName)
        .first();

      if (!template) {
        throw new Error(`Template "${templateName}" não encontrado`);
      }

      if (!template.id) {
        throw new Error(`Template "${templateName}" sem ID válido`);
      }

      // Reutiliza a lógica existente
      const state = get();
      await state.loadTemplate(template.id, dbInstance);
    } catch (error) {
      console.error('Erro ao carregar template por nome:', error);
      throw error;
    }
  },

  /**
   * Marca/desmarca exercício como completado
   */
  toggleExerciseComplete: (order: number) => {
    const { currentExercises } = get();
    
    const updatedExercises = currentExercises.map((ex) =>
      ex.order === order ? { ...ex, completed: !ex.completed } : ex
    );

    set({ currentExercises: updatedExercises });
  },

  /**
   * Atualiza dados de um exercício temporariamente (antes de salvar)
   */
  updateExercise: (order: number, updates: Partial<WorkoutExercise>) => {
    const { currentExercises } = get();
    
    const updatedExercises = currentExercises.map((ex) =>
      ex.order === order ? { ...ex, ...updates } : ex
    );

    set({ currentExercises: updatedExercises });
  },

  /**
   * Salva alterações de exercício no template original do banco
   */
  saveExerciseToTemplate: async (templateId: number, order: number, updates: Partial<WorkoutExercise>, dbInstance = db) => {
    try {
      const template = await dbInstance.workoutTemplates.get(templateId);
      
      if (!template) {
        throw new Error(`Template ${templateId} não encontrado`);
      }

      // Atualiza exercício no template
      const updatedExercises = template.exercises.map((ex) =>
        ex.order === order ? { ...ex, ...updates } : ex
      );

      // Salva no banco
      await dbInstance.workoutTemplates.update(templateId, {
        exercises: updatedExercises,
      });

      // Atualiza estado local preservando status completed
      const { currentExercises } = get();
      interface TemplateExercise extends WorkoutExercise {}

      interface CurrentExercise extends WorkoutExercise {
        completed: boolean;
      }

      const mergedExercises: WorkoutExercise[] = updatedExercises.map((templateEx: TemplateExercise) => {
        const currentEx: CurrentExercise | undefined = currentExercises.find((ex: WorkoutExercise) => ex.order === templateEx.order);
        return currentEx ? { ...templateEx, completed: currentEx.completed } : templateEx;
      });

      set({
        currentTemplate: { ...template, exercises: updatedExercises },
        currentExercises: mergedExercises,
      });

      console.log(`Exercício ordem ${order} atualizado no template`);
    } catch (error) {
      console.error('Erro ao salvar exercício:', error);
      throw error;
    }
  },

  /**
   * Finish and save
   */
  finishWorkout: async (dbInstance = db) => {
    const { currentTemplate, currentExercises, startTime } = get();

    if (!currentTemplate || !startTime) {
      throw new Error('Nenhum treino ativo para finalizar');
    }

    try {
      const endTime = new Date();
      const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);

      const session: Omit<WorkoutSession, 'id'> = {
        templateId: currentTemplate.id!,
        templateName: currentTemplate.name,
        startTime,
        endTime,
        duration: durationMinutes,
        exercises: currentExercises, // snapshot completo
      };

      await dbInstance.workoutSessions.add(session);

      console.log(`Treino "${currentTemplate.name}" finalizado - Duração: ${durationMinutes}min`);

      // set initial state
      set({
        currentTemplate: null,
        currentExercises: [],
        originalExercises: [],
        startTime: null,
        isWorkoutActive: false,
      });
    } catch (error) {
      console.error('Erro ao finalizar treino:', error);
      throw error;
    }
  },

  resetWorkout: () => {
    set({
      currentTemplate: null,
      currentExercises: [],
      originalExercises: [],
      startTime: null,
      isWorkoutActive: false,
    });
  },
}));
