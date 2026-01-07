import { z } from 'zod';
import { WORKOUT_CONFIG } from './constants';

/**
 * Schemas de validação com Zod
 */

export const exerciseNumberSchema = z.number()
  .int()
  .min(1)
  .max(67);

export const setsSchema = z.number()
  .int()
  .min(WORKOUT_CONFIG.MIN_SETS, `Mínimo ${WORKOUT_CONFIG.MIN_SETS} série`)
  .max(WORKOUT_CONFIG.MAX_SETS, `Máximo ${WORKOUT_CONFIG.MAX_SETS} séries`);

export const repsSchema = z.number()
  .int()
  .min(WORKOUT_CONFIG.MIN_REPS, `Mínimo ${WORKOUT_CONFIG.MIN_REPS} repetição`)
  .max(WORKOUT_CONFIG.MAX_REPS, `Máximo ${WORKOUT_CONFIG.MAX_REPS} repetições`);

export const weightSchema = z.number()
  .min(WORKOUT_CONFIG.MIN_WEIGHT, 'Peso não pode ser negativo')
  .max(WORKOUT_CONFIG.MAX_WEIGHT, `Máximo ${WORKOUT_CONFIG.MAX_WEIGHT}kg`);

export const workoutExerciseSchema = z.object({
  exerciseId: z.number().int().positive(),
  exerciseNumber: exerciseNumberSchema,
  exerciseName: z.string().min(1, 'Nome obrigatório'),
  order: z.number().int().positive(),
  sets: setsSchema,
  reps: repsSchema,
  weight: weightSchema,
  completed: z.boolean(),
});

export type WorkoutExerciseValidation = z.infer<typeof workoutExerciseSchema>;

/**
 * Valida dados de exercício e retorna erros formatados
 */
export function validateExercise(data: Partial<WorkoutExerciseValidation>) {
  try {
    workoutExerciseSchema.partial().parse(data);
    return { success: true as const, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.reduce((acc: Record<string, string>, err) => {
        const field = err.path.join('.');
        acc[field] = err.message;
        return acc;
      }, {});
      
      return { success: false as const, errors };
    }
    return { success: false as const, errors: { general: 'Erro de validação' } };
  }
}

/**
 * Valida apenas campos numéricos
 */
export function validateNumericFields(sets: number, reps: number, weight: number) {
  const result = {
    sets: setsSchema.safeParse(sets),
    reps: repsSchema.safeParse(reps),
    weight: weightSchema.safeParse(weight),
  };

  const errors: Record<string, string> = {};
  
  if (!result.sets.success) {
    errors.sets = result.sets.error.issues[0]?.message || 'Séries inválidas';
  }
  if (!result.reps.success) {
    errors.reps = result.reps.error.issues[0]?.message || 'Repetições inválidas';
  }
  if (!result.weight.success) {
    errors.weight = result.weight.error.issues[0]?.message || 'Peso inválido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
