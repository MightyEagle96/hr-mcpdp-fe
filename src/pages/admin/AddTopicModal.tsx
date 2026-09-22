import { useState } from "react";
import { X } from "lucide-react";
import Input from "../../components/form/Input";

interface AddTopicModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (topic: string) => Promise<void>;
  isSubmitting?: boolean;
}

function AddTopicModal({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddTopicModalProps) {
  const [topic, setTopic] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTopic = topic.trim();

    if (!trimmedTopic) return;

    await onSubmit(trimmedTopic);
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setTopic("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add Topic</h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Create a topic for this unit. You can develop the content after
              creating it.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <Input
              label="Topic"
              placeholder="Enter topic title"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!topic.trim() || isSubmitting}
              className="rounded-xl bg-[#C63C38] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? "Creating..." : "Create Topic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTopicModal;
