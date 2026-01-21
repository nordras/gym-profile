import { useEffect, useState } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(() => !window.matchMedia('(display-mode: standalone)').matches);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA instalado com sucesso');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 px-2">
      <div className="alert alert-info shadow-lg p-3">
        <div className="flex items-start gap-2 w-full min-w-0">
          <FiDownload className="text-xl shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm">Instalar Gym Profile</h3>
            <div className="text-xs mt-1 opacity-90">
              Acesso rápido e offline
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <button 
                onClick={handleInstallClick}
                className="btn btn-xs btn-primary"
              >
                Instalar
              </button>
              <button 
                onClick={handleDismiss}
                className="btn btn-xs btn-ghost"
              >
                Agora não
              </button>
            </div>
          </div>
          <button 
            onClick={handleDismiss}
            className="btn btn-ghost btn-xs btn-circle shrink-0"
          >
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
}
