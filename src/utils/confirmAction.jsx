import toast from 'react-hot-toast';

/**
 * Custom Confirmation Dialog using react-hot-toast
 * @param {string} message - The description message
 * @param {function} onConfirm - Callback when confirmed
 * @param {object} options - Optional configuration (title, confirmText, cancelText, danger)
 */
export const confirmAction = (message, onConfirm, options = {}) => {
  const {
    title = "Are you sure?",
    confirmText = "Delete",
    cancelText = "Cancel",
    danger = true
  } = options;

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      } transition-all duration-300 ease-out max-w-sm w-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl pointer-events-auto border border-gray-100 overflow-hidden`}
    >
      <div className="p-8 text-center relative">
        {/* Close Button */}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-2">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            {title}
          </h3>
          <p className="mt-3 text-[14px] text-gray-500 leading-relaxed px-2">
            {message}
          </p>
        </div>

        <div className="mt-10 flex flex-row gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className={`flex-1 px-6 py-3 text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer ${
                danger
                  ? 'bg-[#0f4e3b] hover:bg-[#12614a] shadow-emerald-100'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  ), {
    duration: Infinity,
    position: 'top-center'
  });
};
