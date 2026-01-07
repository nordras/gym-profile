import Dexie, { type EntityTable } from 'dexie';
import type { Exercise, WorkoutTemplate, WorkoutSession } from './types';
import { seedDatabase } from './seedData';

// Definição do banco de dados
class GymDatabase extends Dexie {
  exercises!: EntityTable<Exercise, 'id'>;
  workoutTemplates!: EntityTable<WorkoutTemplate, 'id'>;
  workoutSessions!: EntityTable<WorkoutSession, 'id'>;

  constructor() {
    super('GymProfileDB');
    
    // TODO: MIGRATION STRATEGY
    // 
    // Para adicionar intervalSeconds aos templates existentes em versões futuras:
    // 
    // this.version(2).stores({
    //   exercises: '++id, number, name',
    //   workoutTemplates: '++id, name',
    //   workoutSessions: '++id, templateId, startTime',
    // }).upgrade(async (tx) => {
    //   // Adicionar intervalSeconds: 40 em todos templates existentes
    //   const templates = await tx.table('workoutTemplates').toArray();
    //   for (const template of templates) {
    //     await tx.table('workoutTemplates').update(template.id, {
    //       intervalSeconds: 40,
    //     });
    //   }
    // });
    //
    // Referência: https://dexie.org/docs/Tutorial/Design#database-versioning
    
    this.version(1).stores({
      exercises: '++id, number, name',
      workoutTemplates: '++id, name',
      workoutSessions: '++id, templateId, startTime', // index em startTime para queries
    });
  }
}

// Instância única do banco
export const db = new GymDatabase();

// Flag para prevenir múltiplas inicializações
let isInitializing = false;
let isInitialized = false;

/**
 * Inicializa o banco de dados e popula com dados iniciais
 * Deve ser chamado no useEffect do app/page.tsx
 */
export async function initializeDatabase(): Promise<void> {
  // Prevenir múltiplas chamadas simultâneas
  if (isInitializing || isInitialized) {
    return;
  }
  
  isInitializing = true;
  
  try {
    // Abre a conexão com o banco
    await db.open();
    
    // Verifica se precisa popular dados iniciais
    const exercisesCount = await db.exercises.count();
    
    if (exercisesCount === 0) {
      console.log('Banco de dados vazio. Populando com dados iniciais...');
      await seedDatabase();
      console.log('Banco de dados inicializado com sucesso!');
    } else {
      console.log('Banco de dados já inicializado.');
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    isInitializing = false;
    throw error;
  } finally {
    isInitializing = false;
  }
}
