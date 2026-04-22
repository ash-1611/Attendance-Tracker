import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/Toast.css';

const ToastHost = ({ toasts, onDismiss }) => {
  return (
    <div className="toast-host" aria-live="polite" aria-relevant="additions removals">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="toast-content">
              <div className="toast-title">
                {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Info'}
              </div>
              <div className="toast-message">{toast.message}</div>
            </div>
            {onDismiss && (
              <button
                type="button"
                className="toast-close"
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastHost;

