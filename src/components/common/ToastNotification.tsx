import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgStyles = {
    success: 'bg-stone-900 text-white border-stone-800',
    info: 'bg-amber-600 text-white border-amber-500',
    error: 'bg-rose-600 text-white border-rose-500',
  };

  return (
    <aside
      aria-label="Notifikasi sistem"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm w-full animate-in slide-in-from-bottom-3 duration-200"
    >
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl border ${bgStyles[type]}`}
      >
        <div className="flex items-center gap-2.5 text-xs font-medium">
          {type === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0 text-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-300" />
          )}
          <span>{message}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-stone-300 hover:text-white rounded-lg transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
