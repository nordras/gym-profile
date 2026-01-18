export interface Exercise {
  id?: number;
  number: number;
  name: string;
}

export interface WorkoutExercise {
  exerciseId: number;
  exerciseNumber: number;
  exerciseName: string;
  order: number;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface WorkoutTemplate {
  id?: number;
  name: string;
  exercises: WorkoutExercise[];
  intervalSeconds?: number;
}

export interface WorkoutSession {
  id?: number;
  templateId: number;
  templateName: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  exercises: WorkoutExercise[];
}

export interface ExerciseOption {
  value: number;
  label: string;
  number: number;
  name: string;
}
