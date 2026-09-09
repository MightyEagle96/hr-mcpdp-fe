import React from "react";
import { AlertTriangle, BookOpen, X } from "lucide-react";

interface ConfirmModuleDialogProps {
  open: boolean;
  module: {
    title: string;
    code: string;
    description: string;
  };
  isSubmitting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmModuleDialog({
  open,
  module,
  isSubmitting = false,
  onCancel,
  onConfirm,
}: ConfirmModuleDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={isSubmitting ? undefined : onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 sm:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
              <BookOpen size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Create Module
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Confirm module creation
              </p>
            </div>
          </div>

          {!isSubmitting && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-6 sm:px-7">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Module
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {module.title || "Untitled Module"}
              </h3>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Module Code
              </p>

              <p className="mt-1 text-sm font-semibold text-[#C63C38]">
                {module.code || "No code provided"}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Description
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {module.description || "No description provided"}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <p className="text-sm leading-6 text-amber-800">
              Please review the information carefully. Once created, you can
              edit the module from the module management section.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Go Back
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="rounded-xl bg-gradient-to-r from-[#C63C38] to-[#B63431] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating Module..." : "Confirm & Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModuleDialog;
