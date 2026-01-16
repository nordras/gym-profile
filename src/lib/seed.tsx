// import { db } from './db';
import type { Exercise, WorkoutTemplate, WorkoutExercise } from './types';

// Lista completa dos 67 aparelhos da academia
const EXERCISES_DATA: Omit<Exercise, 'id'>[] = [
  { number: 1, name: 'Pulley Alto' },
  { number: 2, name: 'Vertical Traction' },
  { number: 4, name: 'Remada Simetria' },
  { number: 5, name: 'Elevação Lateral Máquina' },
  { number: 6, name: 'Remada Articulada Alta' },
  { number: 7, name: 'Remada Baixa Máquina' },
  { number: 8, name: 'Cross Angular' },
  { number: 9, name: 'Polia Unilateral' },
  { number: 10, name: 'Graviton' },
  { number: 11, name: 'Remada com Apoio Máquina' },
  { number: 12, name: 'Desenvolvimento Máquina' },
  { number: 13, name: 'Desenvolvimento com Anilha' },
  { number: 15, name: 'Bíceps Articulado' },
  { number: 16, name: 'Voador Peitoral / Fly' },
  { number: 17, name: 'Supino Vertical Máquina' },
  { number: 18, name: 'Peck Deck' },
  { number: 19, name: 'Dual Chest' },
  { number: 20, name: 'Tríceps Paralela' },
  { number: 21, name: 'Cross Over' },
  { number: 22, name: 'Bíceps MTS' },
  { number: 23, name: 'Tríceps MTS' },
  { number: 24, name: 'Bíceps Life' },
  { number: 25, name: 'Tríceps Life' },
  { number: 26, name: 'Supino Vertical com Anilha' },
  { number: 27, name: 'Decline Press Nautilus' },
  { number: 28, name: 'Incline Press Nautilus' },
  { number: 29, name: 'Multi Supino' },
  { number: 30, name: 'Incline Press Hammer' },
  { number: 31, name: 'Banco Scott' },
  { number: 32, name: 'Bíceps Articulado Scott' },
  { number: 33, name: 'Supino Declinado Barra' },
  { number: 34, name: 'Supino Reto Barra' },
  { number: 35, name: 'Supino Inclinado Barra' },
  { number: 36, name: 'Cadeira Extensora' },
  { number: 37, name: 'Flexora Sentada' },
  { number: 38, name: 'Extensora Unilateral' },
  { number: 39, name: 'Flexora Vertical Dual / Unilateral' },
  { number: 40, name: 'Mesa Flexora' },
  { number: 41, name: 'Glúteo Mesa' },
  { number: 42, name: 'Glúteo 4 Apoios' },
  { number: 43, name: 'Glúteo Chute' },
  { number: 44, name: 'Leg Horizontal' },
  { number: 45, name: 'Cadeira Abdutora' },
  { number: 46, name: 'Cadeira Adutora' },
  { number: 48, name: 'Leg 80°' },
  { number: 49, name: 'Elevação Pélvica' },
  { number: 50, name: 'V-Squat Máquina' },
  { number: 51, name: 'Leg Invertido / Squat Press' },
  { number: 52, name: 'Leg 45°' },
  { number: 53, name: 'V-Squat' },
  { number: 54, name: 'Total Leg' },
  { number: 55, name: 'Linear Hack' },
  { number: 56, name: 'Hack Machine' },
  { number: 57, name: 'Ang. Cinturão' },
  { number: 58, name: 'Agachamento Livre' },
  { number: 59, name: 'Smith' },
  { number: 60, name: 'Abdominal Morcego' },
  { number: 61, name: 'Banco Panturrilha' },
  { number: 62, name: 'Panturrilha em Pé' },
  { number: 63, name: 'Abdominal Crunch' },
  { number: 63.5, name: 'Abdominal Máquina' }, // 63B
  { number: 64, name: 'Máquina Lombar' },
  { number: 65, name: 'Banco Abdominal Life' },
  { number: 66, name: 'Abdominal Carrinho' },
  { number: 67, name: 'Banco Lombar' },
];

// Template Treino A - Membros Superiores
const TREINO_A_EXERCISES: WorkoutExercise[] = [
  { exerciseId: 17, exerciseNumber: 17, exerciseName: 'Supino Vertical Máquina', order: 1, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 18, exerciseNumber: 18, exerciseName: 'Peck Deck', order: 2, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 1, exerciseNumber: 1, exerciseName: 'Pulley Alto', order: 3, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 7, exerciseNumber: 7, exerciseName: 'Remada Baixa Máquina', order: 4, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 4, exerciseNumber: 4, exerciseName: 'Remada Simetria', order: 5, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 24, exerciseNumber: 24, exerciseName: 'Bíceps Life', order: 6, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 21, exerciseNumber: 21, exerciseName: 'Cross Over', order: 7, sets: 3, reps: 8, weight: 0, completed: false },
  { exerciseId: 5, exerciseNumber: 5, exerciseName: 'Elevação Lateral Máquina', order: 8, sets: 3, reps: 8, weight: 0, completed: false },
];

// Template Treino B - Pernas e Core
const TREINO_B_EXERCISES: WorkoutExercise[] = [
  { exerciseId: 44, exerciseNumber: 44, exerciseName: 'Leg Horizontal', order: 1, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 36, exerciseNumber: 36, exerciseName: 'Cadeira Extensora', order: 2, sets: 3, reps: 15, weight: 0, completed: false },
  { exerciseId: 40, exerciseNumber: 40, exerciseName: 'Mesa Flexora', order: 3, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 45, exerciseNumber: 45, exerciseName: 'Cadeira Abdutora', order: 4, sets: 3, reps: 12, weight: 0, completed: false },
  { exerciseId: 46, exerciseNumber: 46, exerciseName: 'Cadeira Adutora', order: 5, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 64, exerciseNumber: 64, exerciseName: 'Máquina Lombar', order: 6, sets: 3, reps: 10, weight: 0, completed: false },
  { exerciseId: 62, exerciseNumber: 62, exerciseName: 'Panturrilha em Pé', order: 7, sets: 3, reps: 8, weight: 0, completed: false },
  { exerciseId: 61, exerciseNumber: 61, exerciseName: 'Banco Panturrilha', order: 8, sets: 3, reps: 8, weight: 0, completed: false },
];

/**
 * Popula o banco de dados com dados iniciais
 * Executa apenas se as tabelas estiverem vazias
 */
// export async function seedDatabase(): Promise<void> {
//   try {
//     // Verifica se já existem dados
//     const exercisesCount = await db.exercises.count();
//     const templatesCount = await db.workoutTemplates.count();

//     if (exercisesCount === 0) {
//       console.log('Populando exercícios...');
//       await db.exercises.bulkAdd(EXERCISES_DATA);
//       console.log(`${EXERCISES_DATA.length} exercícios adicionados`);
//     }

//     if (templatesCount === 0) {
//       console.log('Populando templates de treino...');
      
//       const treinoA: Omit<WorkoutTemplate, 'id'> = {
//         name: 'Treino A',
//         exercises: TREINO_A_EXERCISES,
//         intervalSeconds: 40,
//       };

//       const treinoB: Omit<WorkoutTemplate, 'id'> = {
//         name: 'Treino B',
//         exercises: TREINO_B_EXERCISES,
//         intervalSeconds: 40,
//       };

//       await db.workoutTemplates.bulkAdd([treinoA, treinoB]);
//       console.log('Templates Treino A e Treino B adicionados');
//     }

//     console.log('Seed database completo!');
//   } catch (error) {
//     console.error('Erro ao popular banco de dados:', error);
//     throw error;
//   }
// }