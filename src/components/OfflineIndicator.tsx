import { useEffect, useState } from 'react';
import { FiWifiOff, FiWifi } from 'react-icons/fi';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showToast) return null;

  return (
    <div className="toast toast-top toast-center z-50">
      <div className={`alert ${isOnline ? 'alert-success' : 'alert-warning'} shadow-lg max-w-xs`}>
        <div className="flex items-center gap-2 text-sm">
          {isOnline ? (
            <>
              <FiWifi className="text-base shrink-0" />
              <span className="font-semibold">Conectado</span>
            </>
          ) : (
            <>
              <FiWifiOff className="text-base shrink-0" />
              <span className="font-semibold">Modo offline</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
