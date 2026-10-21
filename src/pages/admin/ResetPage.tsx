import { useState } from "react";
import {
  AlertTriangle,
  Database,
  ShieldAlert,
  Trash2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  X,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import { httpService } from "../../httpService";

const CONFIRMATION_PHRASE = "RESET HR-MCPDP";

function ResetPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const canReset = confirmation.trim() === CONFIRMATION_PHRASE && !isResetting;

  const closeDialog = () => {
    if (isResetting) return;

    setIsDialogOpen(false);
    setConfirmation("");
  };

  const handleReset = async () => {
    if (!canReset) return;

    setIsResetting(true);
    setResult(null);

    try {
      // Replace this route with your protected backend endpoint.
      const response = await httpService.post("/admin/reset_database", {
        confirmation,
      });

      setResult({
        success: true,
        message:
          response.data?.message ||
          "The database reset completed successfully.",
      });

      setIsDialogOpen(false);
      setConfirmation("");
    } catch (error: any) {
      setResult({
        success: false,
        message:
          error?.response?.data?.message ||
          "The database reset failed. Please check the server logs.",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Page heading */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
            <Database size={28} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Database Reset
              </h1>

              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Temporary Tool
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Administrative maintenance utility for resetting the HR-MCPDP
              database during controlled development and testing.
            </p>
          </div>
        </div>

        {/* Warning banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
          <ShieldAlert size={23} className="mt-0.5 shrink-0 text-[#C63C38]" />

          <div>
            <h2 className="font-bold text-red-900">Destructive operation</h2>
            <p className="mt-1 text-sm leading-6 text-red-800">
              Resetting a database can permanently remove records and disrupt
              the learning portal. Confirm the target environment, database
              name, and backup status before proceeding.
            </p>
          </div>
        </div>

        {/* Main reset card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <RefreshCw size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Reset database records
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Run the reset procedure configured on your backend. The exact
                  collections affected must be defined and verified by the
                  server.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Database size={17} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Operation
                  </span>
                </div>
                <p className="mt-2 font-bold text-slate-900">Database reset</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Defined by the server-side reset procedure.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle size={17} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Risk level
                  </span>
                </div>
                <p className="mt-2 font-bold text-amber-900">High</p>
                <p className="mt-1 text-xs leading-5 text-amber-800">
                  Records may be permanently deleted.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-slate-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-3">
              <LockKeyhole
                size={19}
                className="mt-0.5 shrink-0 text-slate-500"
              />
              <p className="max-w-md text-xs leading-5 text-slate-500">
                This action should be restricted to authorized administrators
                and protected by server-side environment checks.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setResult(null);
                setConfirmation("");
                setIsDialogOpen(true);
              }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/15 transition hover:bg-[#B63431]"
            >
              <Trash2 size={17} />
              Reset Database
            </button>
          </div>
        </div>

        {/* Result feedback */}
        {result && (
          <div
            role="status"
            className={`flex items-start gap-3 rounded-2xl border p-4 ${
              result.success
                ? "border-emerald-200 bg-emerald-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            {result.success ? (
              <CheckCircle2
                size={21}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
            ) : (
              <XCircle size={21} className="mt-0.5 shrink-0 text-red-600" />
            )}

            <div>
              <p
                className={`text-sm font-bold ${
                  result.success ? "text-emerald-900" : "text-red-900"
                }`}
              >
                {result.success ? "Operation completed" : "Operation failed"}
              </p>
              <p
                className={`mt-1 text-sm leading-6 ${
                  result.success ? "text-emerald-800" : "text-red-800"
                }`}
              >
                {result.message}
              </p>
            </div>
          </div>
        )}

        {/* Temporary-tool notice */}
        <p className="text-center text-xs text-slate-400">
          HR-MCPDP · Administrative maintenance utility
        </p>
      </div>

      {/* Confirmation dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isResetting) {
              closeDialog();
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="reset-dialog-title"
            aria-describedby="reset-dialog-description"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="h-1.5 bg-[#C63C38]" />

            <button
              type="button"
              onClick={closeDialog}
              disabled={isResetting}
              aria-label="Close dialog"
              className="absolute right-5 top-5 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 disabled:opacity-50"
            >
              <X size={19} />
            </button>

            <div className="p-6 sm:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-[#C63C38] ring-8 ring-red-50">
                <AlertTriangle size={27} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#C63C38]">
                Irreversible action
              </p>

              <h2
                id="reset-dialog-title"
                className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
              >
                Reset the database?
              </h2>

              <p
                id="reset-dialog-description"
                className="mt-3 text-sm leading-6 text-slate-600"
              >
                This will invoke the configured server-side reset procedure. Do
                not continue until you have verified the target database and
                secured any required backups.
              </p>

              <label
                htmlFor="reset-confirmation"
                className="mb-2 mt-6 block text-sm font-semibold text-slate-700"
              >
                Type{" "}
                <span className="select-all text-[#C63C38]">
                  {CONFIRMATION_PHRASE}
                </span>{" "}
                to confirm
              </label>

              <input
                id="reset-confirmation"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                disabled={isResetting}
                autoComplete="off"
                spellCheck={false}
                placeholder="Enter confirmation phrase"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#C63C38] focus:ring-4 focus:ring-[#C63C38]/10 disabled:bg-slate-50"
              />

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={isResetting}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!canReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isResetting ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={17} />
                      Confirm Reset
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPage;
