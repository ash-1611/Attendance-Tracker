import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/ConfirmModal.css';

const ConfirmModal = ({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmDisabled = false,
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="confirm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="confirm-modal"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="confirm-header">
              <div className="confirm-title">{title}</div>
            </div>
            <div className="confirm-body">{message}</div>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-secondary btn-md"
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className={`btn btn-${confirmVariant} btn-md`}
                disabled={confirmDisabled}
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;

