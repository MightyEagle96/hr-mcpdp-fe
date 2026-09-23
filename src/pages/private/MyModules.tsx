import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PackageOpen,
  PlayCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { httpService } from "../../httpService";

interface Module {
  _id: string;
  title: string;
  description: string;
  code: string;
  imageUrl: string;
  status: "active" | "inactive";
}

interface ModulePurchase {
  _id: string;
  module: Module;
  candidate: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed" | "refunded";
  paymentProvider: "stripe";
  paymentReference: string;
  purchasedAt: string;
  createdAt: string;
  updatedAt: string;
}

function MyModules() {
  const [purchases, setPurchases] = useState<ModulePurchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const findMyModules = async () => {
    try {
      setIsLoading(true);

      const { data } = await httpService.get("/modulepurchase/my-modules");

      setPurchases(data.data);
    } catch (error) {
      console.error("Failed to fetch purchased modules:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findMyModules();
  }, []);

  if (isLoading) {
    return <MyModulesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <main className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#C63C38]/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#C63C38]">
                <GraduationCap size={15} />
                My Learning
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#242625] sm:text-4xl">
                My Modules
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Access the MCPDP modules you have purchased and continue your
                professional development journey.
              </p>
            </div>

            {purchases.length > 0 && (
              <Link
                to="/candidate/modules"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
              >
                Browse Modules
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </section>

        {/* Summary */}
        {purchases.length > 0 && (
          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <SummaryCard
              icon={<BookOpen size={19} />}
              label="Purchased Modules"
              value={String(purchases.length)}
            />

            <SummaryCard
              icon={<CheckCircle2 size={19} />}
              label="Active Access"
              value={String(
                purchases.filter((purchase) => purchase.status === "paid")
                  .length,
              )}
            />

            <SummaryCard
              icon={<Clock3 size={19} />}
              label="Learning"
              value="Continue"
            />
          </section>
        )}

        {/* Empty State */}
        {purchases.length === 0 ? (
          <EmptyModules />
        ) : (
          <>
            {/* Section Heading */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#242625]">
                Your Learning Library
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Continue learning from any of your purchased modules.
              </p>
            </div>

            {/* Modules */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {purchases.map((purchase) => (
                <MyModuleCard key={purchase._id} purchase={purchase} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

interface MyModuleCardProps {
  purchase: ModulePurchase;
}

function MyModuleCard({ purchase }: MyModuleCardProps) {
  const { module } = purchase;

  // Temporary demo progress.
  // This will eventually come from the candidate's learning progress.
  const progress = 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        {module.imageUrl ? (
          <img
            src={module.imageUrl}
            alt={module.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <BookOpen size={42} strokeWidth={1.5} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Purchased badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700 shadow-sm backdrop-blur-sm">
            <CheckCircle2 size={13} />
            Purchased
          </span>
        </div>

        {/* Code */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-lg bg-black/40 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            {module.code}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900">
          {module.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {module.description}
        </p>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Learning Progress
            </span>

            <span className="text-xs font-bold text-[#242625]">
              {progress}%
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#C63C38] transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Purchase Information */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Purchased
            </p>

            <p className="mt-1 text-xs font-medium text-slate-600">
              {formatDate(purchase.purchasedAt)}
            </p>
          </div>

          <span className="text-xs font-semibold text-emerald-600">
            Full Access
          </span>
        </div>

        {/* Action */}
        <Link
          to={`/candidate/modules/${module._id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#242625] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5D605F]"
        >
          {progress > 0 ? (
            <>
              <PlayCircle size={17} />
              Continue Learning
            </>
          ) : (
            <>
              <BookOpen size={17} />
              Start Learning
            </>
          )}

          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-lg font-bold text-[#242625]">{value}</p>
      </div>
    </div>
  );
}

function EmptyModules() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <PackageOpen size={30} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-[#242625]">
        You haven't purchased any modules yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Explore the available MCPDP modules and choose the learning programmes
        you would like to participate in.
      </p>

      <Link
        to="/candidate/modules"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431]"
      >
        <GraduationCap size={17} />
        Explore Modules
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function MyModulesSkeleton() {
  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <main className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-72 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-full max-w-xl animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
            >
              <div className="aspect-[16/9] animate-pulse bg-slate-200" />

              <div className="space-y-4 p-6">
                <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-12 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-2 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyModules;
