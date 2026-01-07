"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import SearchableExerciseSelect from './SearchableExerciseSelect';
import ConfirmModal from './ConfirmModal';
import ModifiedBadge from './ModifiedBadge';
import { useExerciseValidation } from '@/hooks/useExerciseValidation';
import type { WorkoutExercise } from '@/lib/types';

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  originalExercise?: WorkoutExercise;
  onToggleComplete: () => void;
  onSaveChanges: (updates: Partial<WorkoutExercise>, saveToTemplate: boolean) => void;
}

export default function ExerciseCard({
  exercise,
  originalExercise,
  onToggleComplete,
  onSaveChanges,
}: ExerciseCardProps) {
  const { validate } = useExerciseValidation();
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Estado temporário para edição
  const [editedExercise, setEditedExercise] = useState({
    exerciseId: exercise.exerciseId,
    exerciseName: exercise.exerciseName,
    exerciseNumber: exercise.exerciseNumber,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
  });

  // Sincronizar estado apenas quando exercise prop mudar (não em modo edição)
  useEffect(() => {
    if (!isEditing) {
      setEditedExercise({
        exerciseId: exercise.exerciseId,
        exerciseName: exercise.exerciseName,
        exerciseNumber: exercise.exerciseNumber,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
      });
    }
  }, [exercise, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedExercise({
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      exerciseNumber: exercise.exerciseNumber,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedExercise({
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      exerciseNumber: exercise.exerciseNumber,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
    });
  };

  const handleOk = () => {
    // Validar antes de abrir modal
    const { isValid, errors } = validate(
      editedExercise.sets,
      editedExercise.reps,
      editedExercise.weight
    );

    if (!isValid) {
      setValidationErrors(errors);
      toast.error('Corrija os erros antes de salvar');
      return;
    }

    setValidationErrors({});
    setShowConfirmModal(true);
  };

  const handleConfirmSave = (saveToTemplate: boolean) => {
    onSaveChanges({
      exerciseId: editedExercise.exerciseId,
      exerciseName: editedExercise.exerciseName,
      exerciseNumber: editedExercise.exerciseNumber,
      sets: editedExercise.sets,
      reps: editedExercise.reps,
      weight: editedExercise.weight,
    }, saveToTemplate);
    
    setShowConfirmModal(false);
    setIsEditing(false);
  };

  return (
    <>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-4">
          {!isEditing ? (
            // Modo Visualização
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={exercise.completed}
                onChange={onToggleComplete}
                className="checkbox checkbox-primary"
              />

              {/* Ordem */}
              <div className="badge badge-neutral">{exercise.order}</div>

              {/* Exercício */}
              <div className="flex-1">
                <div className="font-semibold">
                  {String(exercise.exerciseNumber).padStart(2, '0')} - {exercise.exerciseName}
                </div>
                <div className="text-sm text-gray-600">
                  {exercise.sets}x{exercise.reps} • {exercise.weight}kg
                </div>
                {originalExercise && (
                  <ModifiedBadge current={exercise} original={originalExercise} />
                )}
              </div>

              {/* Botão Editar */}
              <button
                className="btn btn-sm btn-ghost"
                onClick={handleEdit}
              >
                ✏️ Editar
              </button>
            </div>
          ) : (
            // Modo Edição
            <div className="space-y-3">
              {/* Ordem (não editável) */}
              <div className="flex items-center gap-2">
                <span className="badge badge-neutral">{exercise.order}</span>
                <span className="text-sm font-medium">Exercício:</span>
              </div>

              {/* Seletor de Exercício */}
              <SearchableExerciseSelect
                value={editedExercise.exerciseId}
                onChange={(id, name, number) => {
                  setEditedExercise({
                    ...editedExercise,
                    exerciseId: id,
                    exerciseName: name,
                    exerciseNumber: number,
                  });
                }}
              />

              {/* Inputs de Séries, Reps e Peso */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="label label-text text-xs">Séries</label>
                  <input
                    type="number"
                    min="1"
                    value={editedExercise.sets}
                    onChange={(e) => setEditedExercise({
                      ...editedExercise,
                      sets: parseInt(e.target.value) || 1,
                    })}
                    className={`input input-bordered input-sm w-full ${
                      validationErrors.sets ? 'input-error' : ''
                    }`}
                  />
                  {validationErrors.sets && (
                    <label className="label">
                      <span className="label-text-alt text-error">{validationErrors.sets}</span>
                    </label>
                  )}
                </div>
                <div>
                  <label className="label label-text text-xs">Reps</label>
                  <input
                    type="number"
                    min="1"
                    value={editedExercise.reps}
                    onChange={(e) => setEditedExercise({
                      ...editedExercise,
                      reps: parseInt(e.target.value) || 1,
                    })}
                    className={`input input-bordered input-sm w-full ${
                      validationErrors.reps ? 'input-error' : ''
                    }`}
                  />
                  {validationErrors.reps && (
                    <label className="label">
                      <span className="label-text-alt text-error">{validationErrors.reps}</span>
                    </label>
                  )}
                </div>
                <div>
                  <label className="label label-text text-xs">Peso (kg)</label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    step="0.5"
                    value={editedExercise.weight}
                    onChange={(e) => setEditedExercise({
                      ...editedExercise,
                      weight: parseFloat(e.target.value) || 0,
                    })}
                    className={`input input-bordered input-sm w-full ${
                      validationErrors.weight ? 'input-error' : ''
                    }`}
                  />
                  {validationErrors.weight && (
                    <label className="label">
                      <span className="label-text-alt text-error">{validationErrors.weight}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2 justify-end">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleOk}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Salvar Alterações"
        message="Deseja salvar as alterações no template original? Isso afetará os próximos treinos."
        onConfirm={() => handleConfirmSave(true)}
        onCancel={() => handleConfirmSave(false)}
        confirmText="Sim, salvar no template"
        cancelText="Não, apenas esta sessão"
      />
    </>
  );
}
