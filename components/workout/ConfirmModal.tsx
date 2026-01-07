"use client";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <button 
              className="btn btn-ghost" 
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button 
              className="btn btn-primary" 
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={onCancel}></div>
      </div>
    </>
  );
}
