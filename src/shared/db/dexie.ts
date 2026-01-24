import Dexie, { Table } from 'dexie';
import type { Exercise, WorkoutExercise, WorkoutTemplate, WorkoutSession } from '@/lib/types';

export class GymProfileDB extends Dexie {
  exercises!: Table<Exercise, number>;
  workoutTemplates!: Table<WorkoutTemplate, number>;
  workoutSessions!: Table<WorkoutSession, number>;

  constructor() {
    super('GymProfileDB');
    this.version(1).stores({
      exercises: '++id, number, name',
      workoutTemplates: '++id, name',
      workoutSessions: '++id, templateId, templateName, startTime',
    });
  }
}

export const db = new GymProfileDB();
