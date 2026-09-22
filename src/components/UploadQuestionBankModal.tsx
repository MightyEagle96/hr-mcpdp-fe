import { CheckCircle2, FileSpreadsheet, Upload, X } from "lucide-react";
import { useState } from "react";

interface UploadQuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => Promise<void>;
  loading?: boolean;
}

function UploadQuestionBankModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: UploadQuestionBankModalProps) {
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) return;

    await onSubmit(file);
  };

  const handleClose = () => {
    if (loading) return;

    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C63C38]/10 text-[#C63C38]">
                <FileSpreadsheet size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Upload Question Bank
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Add questions to the module pre-test
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* Upload Area */}
          <label htmlFor="question-bank-file" className="block cursor-pointer">
            <div
              className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
                file
                  ? "border-emerald-300 bg-emerald-50/50"
                  : "border-slate-200 bg-slate-50/50 hover:border-[#C63C38]/40 hover:bg-[#C63C38]/5"
              }`}
            >
              {file ? (
                <>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    File selected
                  </h3>

                  <p className="mt-1 break-all text-sm text-slate-500">
                    {file.name}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                    <Upload size={22} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Upload question bank
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Click to select an Excel file
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    .xlsx or .xls files only
                  </p>
                </>
              )}
            </div>

            <input
              id="question-bank-file"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>

          {/* Expected Format */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Expected Excel Columns
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "question",
                "option a",
                "option b",
                "option c",
                "option d",
                "answer",
              ].map((column) => (
                <span
                  key={column}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  {column}
                </span>
              ))}
            </div>
          </div>

          {/* Notice */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-sm leading-5 text-blue-800">
              Each row in the Excel file will be imported as one question. The
              answer should correspond to the correct option.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!file || loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload Questions
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadQuestionBankModal;
