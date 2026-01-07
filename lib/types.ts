// Tipos para o banco de dados Dexie.js

export interface Exercise {
  id?: number; // auto-increment
  number: number; // 1-67
  name: string;
}

export interface WorkoutExercise {
  exerciseId: number;
  exerciseNumber: number;
  exerciseName: string;
  order: number;
  sets: number;
  reps: number;
  weight: number; // aceita decimais (ex: 7.5kg)
  completed: boolean;
}

export interface WorkoutTemplate {
  id?: number; // auto-increment
  name: string; // "Treino A", "Treino B"
  exercises: WorkoutExercise[];
  intervalSeconds?: number; // intervalo entre exercícios (ex: 40s)
}

export interface WorkoutSession {
  id?: number; // auto-increment
  templateId: number;
  templateName: string;
  startTime: Date;
  endTime: Date;
  duration: number; // em minutos
  exercises: WorkoutExercise[]; // snapshot completo
}

// Tipo auxiliar para react-select
export interface ExerciseOption {
  value: number; // exerciseId
  label: string; // "Nº - Nome"
  number: number;
  name: string;
}
