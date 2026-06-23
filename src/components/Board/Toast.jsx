// ========================== Toast.jsx ==========================
// Small toast component with optional undo action

const Toast = ({ message, actionLabel, onAction, onClose }) => {
  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-8 bg-slate-800 border border-slate-500 text-red-800 px-4 py-3 rounded-lg shadow-lg">
      {/* Toast message */}
      <span className="text-sm">{message}</span>

      {/* Optional action button (Undo) */}
      {actionLabel && (
        <button
          onClick={onAction}
          className="text-blue-400 text-sm hover:underline"
        >
          {actionLabel}
        </button>
      )}

      {/* Close toast */}
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-200 text-sm"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
