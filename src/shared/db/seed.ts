import { db } from '@/shared/db/dexie';
import { EXERCISES_DATA, TREINO_A_EXERCISES, TREINO_B_EXERCISES } from '@/lib/seed';
import type { WorkoutTemplate } from '@/lib/types';

export async function seedDatabase() {
  const exercisesCount = await db.exercises.count();
  const templatesCount = await db.workoutTemplates.count();

  if (exercisesCount === 0) {
    await db.exercises.bulkAdd(EXERCISES_DATA);
  }

  if (templatesCount === 0) {
    const treinoA: Omit<WorkoutTemplate, 'id'> = {
      name: 'Treino A',
      exercises: TREINO_A_EXERCISES,
      intervalSeconds: 40,
    };
    const treinoB: Omit<WorkoutTemplate, 'id'> = {
      name: 'Treino B',
      exercises: TREINO_B_EXERCISES,
      intervalSeconds: 40,
    };
    await db.workoutTemplates.bulkAdd([treinoA, treinoB]);
  }
}
