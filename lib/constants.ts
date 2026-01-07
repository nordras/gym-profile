export const WORKOUT_CONFIG = {
  INTERVAL_SECONDS: 40,
  DEFAULT_DURATION_MINUTES: 40,
  MIN_WEIGHT: 0,
  MAX_WEIGHT: 500,
  MIN_SETS: 1,
  MAX_SETS: 10,
  MIN_REPS: 1,
  MAX_REPS: 50,
  WEIGHT_STEP: 0.5,
} as const;

export const TEMPLATE_NAMES = {
  TREINO_A: 'Treino A',
  TREINO_B: 'Treino B',
} as const;

export const MESSAGES = {
  WORKOUT_FINISHED: 'Treino finalizado',
  WORKOUT_FINISH_ERROR: 'Erro ao finalizar treino. Tente novamente.',
  TEMPLATE_LOAD_ERROR: 'Erro ao carregar template',
  EXERCISE_SAVE_SUCCESS: 'Exercício salvo',
  EXERCISE_SAVE_ERROR: 'Erro ao salvar exercício',
  TEMPLATE_UPDATED: 'Template atualizado!',
  SESSION_ONLY: 'Alteração salva apenas nesta sessão',
  DB_INIT_ERROR: 'Erro ao inicializar banco de dados',
} as const;

export const EXERCISE_COUNT = {
  TOTAL: 67,
  TREINO_A: 8,
  TREINO_B: 8,
} as const;
