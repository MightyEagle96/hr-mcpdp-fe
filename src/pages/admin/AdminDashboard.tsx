import { ArrowUpRight, BookOpen, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  // Temporary values.
  // These will come from the dashboard API.
  const stats = {
    subscribers: 12450,
    modules: 24,
    activeModules: 18,
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 mb-12">
      {/* ========================================================= */}
      {/* Hero                                                      */}
      {/* ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-[#7F2523]
          via-[#A8322F]
          to-[#C63C38]
          px-6
          py-7
          text-white
          shadow-lg
          sm:px-8
          lg:px-10
        "
      >
        {/* Decorative glow */}

        <div
          className="
            absolute
            -right-20
            -top-32
            h-72
            w-72
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            right-32
            h-64
            w-64
            rounded-full
            bg-white/5
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Welcome */}

          <div>
            <p className="text-sm font-medium text-red-100">
              HRORBN MCPDP Operations Centre
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Good morning, Administrator 👋
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-red-100 sm:text-base">
              Manage professional development modules, subscribers, learning
              content and the MCPDP programme from one place.
            </p>
          </div>

          {/* Create Course */}

          <Link
            to="/admin/modules/create"
            className="
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-2xl
              bg-white
              px-5
              py-3.5
              text-sm
              font-bold
              text-[#A8322F]
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >
            <Plus size={19} />
            Create New Course
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Statistics                                                */}
      {/* ========================================================= */}

      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Subscribers */}

          <StatCard
            title="Subscribers"
            value={stats.subscribers.toLocaleString()}
            description="Registered professionals"
            icon={<Users size={22} />}
            href="/admin/subscribers"
          />

          {/* Modules */}

          <StatCard
            title="Modules"
            value={stats.modules.toLocaleString()}
            description="Modules in the portal"
            icon={<BookOpen size={22} />}
            href="/admin/modules"
          />

          {/* Active Modules */}

          <StatCard
            title="Active Modules"
            value={stats.activeModules.toLocaleString()}
            description="Currently available"
            icon={<BookOpen size={22} />}
            href="/admin/modules?status=active"
          />
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;

/* =============================================================== */
/* Stat Card                                                       */
/* =============================================================== */

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function StatCard({ title, value, description, icon, href }: StatCardProps) {
  return (
    <Link
      to={href}
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-red-50
            text-[#C63C38]
          "
        >
          {icon}
        </div>

        <ArrowUpRight
          size={19}
          className="
            text-slate-300
            transition
            group-hover:text-[#C63C38]
          "
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
    </Link>
  );
}
