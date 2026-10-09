import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileBadge,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

export interface IModuleProgress {
  _id: string;
  module: {
    _id: string;
    title: string;
    description?: string;
  };
  score: number;
  completed: boolean;
  certificate?: {
    _id: string;
    serialNumber: string;
    certificateUrl: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface CandidateCertificatesProps {
  moduleProgress: IModuleProgress[];
  loading?: boolean;
  onGenerateCertificate: (progressId: string) => void;
  onViewCertificate: (certificateId: string) => void;
  generatingProgressId?: string | null;
}

function CandidateCertificates({
  moduleProgress,
  loading = false,
  onGenerateCertificate,
  onViewCertificate,
  generatingProgressId = null,
}: CandidateCertificatesProps) {
  const issuedCount = moduleProgress.filter(
    (progress) => progress.score === 100 && progress.certificate,
  ).length;

  const eligibleCount = moduleProgress.filter(
    (progress) => progress.score === 100 && !progress.certificate,
  ).length;

  const inProgressCount = moduleProgress.filter(
    (progress) => progress.score !== 100,
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Page heading */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <BookOpen size={16} />
            <span>My Learning</span>
            <span>/</span>
            <span className="font-medium text-emerald-700">Certificates</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Certificates
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Track your module achievements and access certificates earned
            through your professional development.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            icon={<FileBadge size={22} />}
            title="Certificates Issued"
            value={issuedCount}
            color="emerald"
          />

          <SummaryCard
            icon={<Award size={22} />}
            title="Ready for Certification"
            value={eligibleCount}
            color="blue"
          />

          <SummaryCard
            icon={<Clock size={22} />}
            title="Learning in Progress"
            value={inProgressCount}
            color="amber"
          />
        </div>

        {/* Module list */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Module Progress
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Certificates become available when your module score reaches 100%.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-16">
              <LoaderCircle
                size={30}
                className="animate-spin text-emerald-600"
              />
              <p className="mt-3 text-sm text-slate-500">
                Loading your modules...
              </p>
            </div>
          ) : moduleProgress.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <BookOpen size={36} className="mx-auto text-slate-300" />
              <h3 className="mt-4 font-semibold text-slate-800">
                No modules found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Your module progress will appear here when available.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {moduleProgress.map((progress) => {
                const hasPerfectScore = progress.score === 100;
                const hasCertificate = Boolean(progress.certificate);
                const isGenerating = generatingProgressId === progress._id;

                const certificateIssued = hasPerfectScore && hasCertificate;

                const canGenerate = hasPerfectScore && !hasCertificate;

                return (
                  <article
                    key={progress._id}
                    className="flex flex-col gap-5 p-5 transition hover:bg-slate-50/60 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
                  >
                    {/* Module information */}
                    <div className="flex min-w-0 items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          certificateIssued
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {certificateIssued ? (
                          <ShieldCheck size={24} />
                        ) : (
                          <Award size={24} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold leading-6 text-slate-900">
                          {progress.module?.title ?? "Untitled Module"}
                        </h3>

                        {progress.module?.description && (
                          <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
                            {progress.module.description}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              certificateIssued
                                ? "bg-emerald-50 text-emerald-700"
                                : canGenerate
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {certificateIssued ? (
                              <CheckCircle2 size={13} />
                            ) : canGenerate ? (
                              <Award size={13} />
                            ) : (
                              <Clock size={13} />
                            )}

                            {certificateIssued
                              ? "Certificate issued"
                              : canGenerate
                                ? "Ready for certification"
                                : "In progress"}
                          </span>

                          {progress.certificate?.serialNumber && (
                            <span className="text-xs text-slate-500">
                              No. {progress.certificate.serialNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Score and action */}
                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between lg:min-w-[350px] lg:border-0 lg:pt-0">
                      <div className="min-w-[115px]">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-500">
                            Module score
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              hasPerfectScore
                                ? "text-emerald-700"
                                : "text-slate-700"
                            }`}
                          >
                            {progress.score}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all ${
                              hasPerfectScore
                                ? "bg-emerald-600"
                                : "bg-amber-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, progress.score),
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {certificateIssued ? (
                        <button
                          type="button"
                          onClick={() =>
                            onViewCertificate(progress.certificate!._id)
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
                        >
                          <Download size={16} />
                          View Certificate
                        </button>
                      ) : canGenerate ? (
                        <button
                          type="button"
                          disabled={isGenerating}
                          onClick={() => onGenerateCertificate(progress._id)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isGenerating ? (
                            <LoaderCircle size={16} className="animate-spin" />
                          ) : (
                            <Award size={16} />
                          )}

                          {isGenerating
                            ? "Generating..."
                            : "Generate Certificate"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title="A score of 100% is required to access a certificate."
                          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-400"
                        >
                          <ShieldCheck size={16} />
                          View Certificate
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Informational note */}
        <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-700" />
          <div>
            <p className="text-sm font-semibold text-emerald-900">
              Certificate eligibility
            </p>
            <p className="mt-1 text-sm leading-6 text-emerald-800/80">
              You must attain a score of 100% in a module before generating or
              viewing its certificate. Once issued, your certificate remains
              available from this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: "emerald" | "blue" | "amber";
}

function SummaryCard({ icon, title, value, color }: SummaryCardProps) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{title}</p>
    </div>
  );
}

export default CandidateCertificates;
