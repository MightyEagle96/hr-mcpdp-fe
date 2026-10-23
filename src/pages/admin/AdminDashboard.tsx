import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CreditCard,
  Plus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { httpService } from "../../httpService";
import { useEffect, useState } from "react";
import { toastError } from "../../components/CustomToast";
import AdminDashboardSkeleton from "./AdminDashboardSkeleton";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function AdminDashboard() {
  const [statData, setStateData] = useState({
    accounts: 0,
    subscriptions: 0,
    modules: 0,
    activeModules: 0,
  });

  const [loading, setLoading] = useState(false);
  // Temporary values. Replace these with dashboard API data.

  const greeting = getGreeting();

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await httpService.get("admin/dashboard_data");
      setStateData(data);
      console.log(data);
    } catch (error) {
      toastError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="mb-10 space-y-6 bg-[#F7F8F8] px-3 py-4 sm:space-y-8 sm:px-6 sm:py-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#242625] via-[#343736] to-[#5D605F] px-5 py-6 text-white shadow-sm sm:rounded-3xl sm:px-8 sm:py-8 lg:px-10">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-white/[0.06] blur-3xl sm:h-80 sm:w-80" />

        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-56 w-56 rounded-full bg-[#C63C38]/15 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Welcome */}
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs font-medium tracking-wide text-slate-200">
                HRORBN MCPDP Operations Centre
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {greeting}, Administrator
              <span className="ml-2 inline-block">👋</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              Oversee accounts, subscriptions, professional development modules,
              and learning activities from one central workspace.
            </p>
          </div>

          {/* Primary action */}
          <Link
            to="/modules"
            className="
              inline-flex min-h-12 w-full shrink-0 items-center
              justify-center gap-2 rounded-xl
              bg-[#C63C38] px-5 py-3
              text-sm font-semibold text-white
              shadow-sm transition-all duration-200
              hover:bg-[#B63431] hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#343736]
              sm:w-fit
            "
          >
            <Plus size={18} />
            Create New Module
          </Link>
        </div>
      </section>

      {/* Dashboard statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#242625] sm:text-xl">
              Overview
            </h2>

            <p className="mt-1 text-sm text-[#5D605F]">
              A snapshot of your MCPDP platform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          <StatCard
            title="Accounts"
            value={statData.accounts.toLocaleString()}
            description="Registered accounts"
            icon={<Users size={21} />}
            href="/subscribers"
            accent="charcoal"
          />

          <StatCard
            title="Subscriptions"
            value={statData.subscriptions.toLocaleString()}
            description="Subscription records"
            icon={<CreditCard size={21} />}
            href="/admin/subscriptions"
            accent="crimson"
          />

          <StatCard
            title="Modules"
            value={statData.modules.toLocaleString()}
            description="Modules in the portal"
            icon={<BookOpen size={21} />}
            href="/modules"
            accent="slate"
          />

          <StatCard
            title="Active Modules"
            value={statData.activeModules.toLocaleString()}
            description="Currently available"
            icon={<Activity size={21} />}
            href="/modules?status=active"
            accent="green"
          />
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;

/* -------------------------------------------------------------------------- */
/* Stat Card                                                                  */
/* -------------------------------------------------------------------------- */

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  accent: "charcoal" | "crimson" | "slate" | "green";
}

const accentStyles = {
  charcoal: {
    icon: "bg-slate-100 text-[#343736]",
    bar: "bg-[#343736]",
  },
  crimson: {
    icon: "bg-red-50 text-[#C63C38]",
    bar: "bg-[#C63C38]",
  },
  slate: {
    icon: "bg-slate-100 text-slate-600",
    bar: "bg-slate-400",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-600",
  },
};

function StatCard({
  title,
  value,
  description,
  icon,
  href,
  accent,
}: StatCardProps) {
  const styles = accentStyles[accent];

  return (
    <Link
      to={href}
      className="
        group relative flex min-w-0 flex-col overflow-hidden
        rounded-2xl border border-slate-200/80
        bg-white p-4 shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:border-slate-300
        hover:shadow-md
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-[#C63C38]
        focus-visible:ring-offset-2
        sm:rounded-2xl sm:p-5
      "
    >
      {/* Subtle accent */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 ${styles.bar} opacity-70`}
      />

      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          {icon}
        </div>

        <ArrowUpRight
          size={18}
          className="shrink-0 text-slate-300 transition-colors group-hover:text-slate-600"
        />
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-[#5D605F]">{title}</p>

        <p className="mt-1 break-words text-2xl font-bold tracking-tight text-[#242625] sm:text-3xl">
          {value}
        </p>

        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
          {description}
        </p>
      </div>
    </Link>
  );
}
