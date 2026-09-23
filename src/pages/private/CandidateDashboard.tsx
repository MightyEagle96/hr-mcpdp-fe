import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PlayCircle,
} from "lucide-react";
import { useAppUser } from "../../context/AppUserContext";

function CandidateDashboard() {
  const { user } = useAppUser();
  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#242625] shadow-xl">
          {/* Decorative elements */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C63C38]/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute right-8 top-8 hidden opacity-10 lg:block">
            <GraduationCap size={180} strokeWidth={1} />
          </div>

          <div className="relative grid min-h-[360px] items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:px-14 lg:py-14">
            {/* Welcome */}
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#C63C38]" />
                MCPDP Candidate Portal
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="text-[#C63C38]">{user?.firstName}</span>.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Continue your professional development journey with HRORBN
                MCPDP. Pick up where you left off and keep progressing toward
                your certification requirements.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431]"
                >
                  <PlayCircle size={18} />
                  Continue Learning
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <BookOpen size={17} />
                  View Modules
                </button>
              </div>
            </div>

            {/* Progress Card */}
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl lg:w-[330px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                    Overall Progress
                  </p>

                  <p className="mt-2 text-4xl font-bold text-white">68%</p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C63C38]/15 text-[#C63C38]">
                  <GraduationCap size={26} />
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#C63C38]"
                  style={{ width: "68%" }}
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="text-white/50">
                  17 of 25 modules completed
                </span>

                <span className="font-semibold text-white">68%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStat
            icon={<BookOpen size={20} />}
            label="Modules"
            value="25"
            description="Available to you"
          />

          <DashboardStat
            icon={<CheckCircle2 size={20} />}
            label="Completed"
            value="17"
            description="Modules completed"
          />

          <DashboardStat
            icon={<Clock3 size={20} />}
            label="In Progress"
            value="4"
            description="Currently learning"
          />

          <DashboardStat
            icon={<GraduationCap size={20} />}
            label="Assessments"
            value="12"
            description="Successfully completed"
          />
        </section>

        {/* Continue Learning */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C63C38]">
                Continue Learning
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#242625]">
                Pick up where you left off
              </h2>
            </div>

            <button
              type="button"
              className="hidden items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#C63C38] sm:flex"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              {/* Module Icon */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#C63C38]/10 text-[#C63C38]">
                <BookOpen size={32} />
              </div>

              {/* Module Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#C63C38]">
                    In Progress
                  </span>

                  <span className="text-xs font-medium text-slate-400">
                    Module 18
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  Introduction to Computer-Based Testing
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Continue exploring the principles, processes and professional
                  application of computer-based testing.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#C63C38]"
                      style={{ width: "72%" }}
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-600">72%</span>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#242625] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5D605F]"
              >
                Continue
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface DashboardStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}

function DashboardStat({
  icon,
  label,
  value,
  description,
}: DashboardStatProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          {icon}
        </div>

        <span className="text-2xl font-bold text-[#242625]">{value}</span>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-800">{label}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default CandidateDashboard;
