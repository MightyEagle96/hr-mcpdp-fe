import { AlertTriangle, X, Trash2, LoaderCircle } from "lucide-react";

interface DeleteTopicDialogProps {
  isOpen: boolean;
  topicTitle: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteTopicDialog({
  isOpen,
  topicTitle,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteTopicDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onClose();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !isDeleting) {
          onClose();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-topic-title"
        aria-describedby="delete-topic-description"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top accent */}
        <div className="h-1.5 bg-[#C63C38]" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          aria-label="Close dialog"
          className="absolute right-5 top-6 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
        >
          <X size={19} />
        </button>

        <div className="p-7 sm:p-8">
          {/* Warning icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38] ring-8 ring-[#C63C38]/5">
            <AlertTriangle size={27} strokeWidth={1.8} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C63C38]">
            Delete topic
          </p>

          <h2
            id="delete-topic-title"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Are you absolutely sure?
          </h2>

          <p
            id="delete-topic-description"
            className="mt-3 text-sm leading-6 text-slate-600"
          >
            You're about to delete this topic from your learning module. This
            action may permanently remove its learning content.
          </p>

          {/* Topic details */}
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/70 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#C63C38] shadow-sm">
                <Trash2 size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-red-700/70">
                  Topic to be deleted
                </p>
                <p className="mt-1 break-words text-sm font-bold leading-5 text-slate-900">
                  {topicTitle}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Please ensure you have selected the correct topic before proceeding.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={17} />
                  Delete Topic
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
