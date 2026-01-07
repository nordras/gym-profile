'use client';

import { useCallback } from 'react';
import { validateNumericFields } from '@/lib/validation';

interface UseExerciseValidationReturn {
  validate: (sets: number, reps: number, weight: number) => {
    isValid: boolean;
    errors: Record<string, string>;
  };
  validateSingle: (field: 'sets' | 'reps' | 'weight', value: number) => string | null;
}

/**
 * Hook para validação de exercícios
 */
export function useExerciseValidation(): UseExerciseValidationReturn {
  const validate = useCallback((sets: number, reps: number, weight: number) => {
    return validateNumericFields(sets, reps, weight);
  }, []);

  const validateSingle = useCallback((field: 'sets' | 'reps' | 'weight', value: number) => {
    const { errors } = validateNumericFields(
      field === 'sets' ? value : 1,
      field === 'reps' ? value : 1,
      field === 'weight' ? value : 0
    );
    
    return errors[field] || null;
  }, []);

  return { validate, validateSingle };
}
