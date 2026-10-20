import { useEffect, useState } from "react";
import { X, Pencil, BookOpen, Hash, LoaderCircle, Save } from "lucide-react";

interface EditTopicDialogProps {
  isOpen: boolean;
  topicTitle: string;
  currentOrder: number;
  isSaving: boolean;
  onClose: () => void;
  onSave: (values: { topic: string; order: number }) => void;
}

export default function EditTopicDialog({
  isOpen,
  topicTitle,
  currentOrder,
  isSaving,
  onClose,
  onSave,
}: EditTopicDialogProps) {
  const [title, setTitle] = useState(topicTitle);
  const [order, setOrder] = useState(String(currentOrder));

  useEffect(() => {
    if (isOpen) {
      setTitle(topicTitle);
      setOrder(String(currentOrder));
    }
  }, [isOpen, topicTitle, currentOrder]);

  if (!isOpen) return null;

  const parsedOrder = Number(order);
  const validTitle = title.trim().length > 0;
  const validOrder =
    order.trim() !== "" && Number.isInteger(parsedOrder) && parsedOrder >= 1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validTitle || !validOrder || isSaving) return;

    onSave({
      topic: title.trim(),
      order: parsedOrder,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-topic-title"
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="h-1.5 bg-[#C63C38]" />

        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
              <Pencil size={22} />
            </div>

            <div>
              <h2
                id="edit-topic-title"
                className="text-xl font-bold tracking-tight text-slate-900"
              >
                Edit Topic Details
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Update the topic title or its position in this unit.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close dialog"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6 sm:p-7">
            <div>
              <label
                htmlFor="topic-title-input"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Topic Title
              </label>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="topic-title-input"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  disabled={isSaving}
                  autoFocus
                  maxLength={200}
                  placeholder="Enter topic title"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#C63C38] focus:ring-4 focus:ring-[#C63C38]/10 disabled:bg-slate-50"
                />
              </div>

              {!validTitle && (
                <p className="mt-1.5 text-xs text-red-600">
                  Topic title is required.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="topic-order-input"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Topic Order
              </label>

              <div className="relative">
                <Hash
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="topic-order-input"
                  type="number"
                  min={1}
                  step={1}
                  value={order}
                  onChange={(event) => setOrder(event.target.value)}
                  disabled={isSaving}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#C63C38] focus:ring-4 focus:ring-[#C63C38]/10 disabled:bg-slate-50"
                />
              </div>

              {!validOrder && (
                <p className="mt-1.5 text-xs text-red-600">
                  Enter a positive whole number.
                </p>
              )}

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Other topics in this unit will be reordered automatically.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!validTitle || !validOrder || isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
