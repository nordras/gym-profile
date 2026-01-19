import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { FiRefreshCw } from 'react-icons/fi';

export default function PWAUpdatePrompt() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('Service Worker registrado:', r);
    },
    onRegisterError(error: Error) {
      console.error('Erro ao registrar Service Worker:', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
    setShowUpdatePrompt(false);
  };

  const handleDismiss = () => {
    setNeedRefresh(false);
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 px-2">
      <div className="alert alert-success shadow-lg p-3">
        <div className="flex items-start gap-2 w-full min-w-0">
          <FiRefreshCw className="text-xl shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm">Atualização Disponível</h3>
            <div className="text-xs mt-1 opacity-90">
              Nova versão disponível
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <button 
                onClick={handleUpdate}
                className="btn btn-xs btn-primary"
              >
                Atualizar
              </button>
              <button 
                onClick={handleDismiss}
                className="btn btn-xs btn-ghost"
              >
                Depois
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
