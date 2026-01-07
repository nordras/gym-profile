"use client";

import { useEffect, useState, useCallback } from 'react';
import Select, { SingleValue } from 'react-select';
import { db } from '@/lib/db';
import type { ExerciseOption } from '@/lib/types';

interface SearchableExerciseSelectProps {
  value: number; // exerciseId selecionado
  onChange: (exerciseId: number, exerciseName: string, exerciseNumber: number) => void;
  disabled?: boolean;
}

export default function SearchableExerciseSelect({
  value,
  onChange,
  disabled = false,
}: SearchableExerciseSelectProps) {
  const [options, setOptions] = useState<ExerciseOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadExercises = useCallback(async () => {
    try {
      const exercises = await db.exercises.toArray();
      
      const exerciseOptions: ExerciseOption[] = exercises.map(ex => ({
        value: ex.id!,
        label: `${String(ex.number).padStart(2, '0')} - ${ex.name}`,
        number: ex.number,
        name: ex.name,
      }));

      setOptions(exerciseOptions);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar exercícios:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  const selectedOption = options.find(opt => opt.value === value);

  const handleChange = (newValue: SingleValue<ExerciseOption>) => {
    if (newValue) {
      onChange(newValue.value, newValue.name, newValue.number);
    }
  };

  return (
    <Select<ExerciseOption>
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isLoading={isLoading}
      isDisabled={disabled}
      placeholder="Buscar exercício..."
      className="w-full"
      classNamePrefix="react-select"
      noOptionsMessage={() => "Nenhum exercício encontrado"}
      loadingMessage={() => "Carregando..."}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: '40px',
          fontSize: '14px',
        }),
        menu: (base) => ({
          ...base,
          zIndex: 50,
        }),
      }}
    />
  );
}
