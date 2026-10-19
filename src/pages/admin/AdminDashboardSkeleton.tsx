export default function AdminDashboardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading dashboard"
      aria-busy="true"
      className="mb-10 space-y-6 bg-[#F7F8F8] px-3 py-4 sm:space-y-8 sm:px-6 sm:py-6 lg:px-8"
    >
      {/* Hero Skeleton */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#242625] via-[#343736] to-[#5D605F] px-5 py-6 shadow-sm sm:rounded-3xl sm:px-8 sm:py-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Welcome content */}
          <div className="w-full space-y-4">
            {/* Operations label */}
            <SkeletonBlock className="h-7 w-56 rounded-full bg-white/10" />

            {/* Greeting */}
            <SkeletonBlock className="h-8 w-full max-w-md bg-white/15 sm:h-10" />

            {/* Description */}
            <div className="space-y-2">
              <SkeletonBlock className="h-3.5 w-full max-w-xl bg-white/10 sm:h-4" />
              <SkeletonBlock className="h-3.5 w-4/5 max-w-lg bg-white/10 sm:h-4" />
            </div>
          </div>

          {/* Create module button */}
          <SkeletonBlock className="h-12 w-full rounded-xl bg-white/15 sm:w-48" />
        </div>

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-28 -z-0 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl" />
      </section>

      {/* Statistics heading */}
      <section>
        <div className="mb-4 space-y-2">
          <SkeletonBlock className="h-6 w-32" />
          <SkeletonBlock className="h-4 w-64 max-w-full" />
        </div>

        {/* Statistic cards */}
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
            >
              {/* Accent line */}
              <SkeletonBlock
                className={`absolute inset-x-0 top-0 h-0.5 rounded-none ${
                  index === 1
                    ? "bg-[#C63C38]/30"
                    : index === 3
                      ? "bg-emerald-600/30"
                      : "bg-slate-400/30"
                }`}
              />

              {/* Icon and arrow */}
              <div className="flex items-center justify-between gap-3">
                <SkeletonBlock className="h-10 w-10 rounded-xl" />
                <SkeletonBlock className="h-4 w-4 rounded" />
              </div>

              {/* Card details */}
              <div className="mt-4 space-y-2">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-8 w-32 sm:h-9" />
                <SkeletonBlock className="h-3.5 w-36 max-w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <span className="sr-only">Loading dashboard statistics...</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable Skeleton Block                                                    */
/* -------------------------------------------------------------------------- */

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`}
    />
  );
}
