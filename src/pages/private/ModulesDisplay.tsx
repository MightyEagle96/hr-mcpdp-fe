import {
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ShoppingCart,
} from "lucide-react";
import { httpService } from "../../httpService";
import { toastError } from "../../components/CustomToast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IModule {
  _id: string;
  title: string;
  description: string;
  code: string;
  imageUrl: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface ModuleCardProps {
  module: IModule;
  price: number;
  onPurchase: (module: IModule) => void;
}

function ModulesDisplay() {
  const [modules, setModules] = useState<IModule[]>([]);

  const navigate = useNavigate();
  const fetchAllModules = async () => {
    try {
      const { data } = await httpService.get("/module/find_all_modules");
      setModules(data.data);
      //console.log(data);
    } catch (error) {
      toastError(error);
    }
  };
  const handlePurchase = (module: IModule) => {
    navigate(`/modules/purchase/${module._id}`);
    //console.log("Purchase:", module);
  };

  useEffect(() => {
    fetchAllModules();
  }, []);
  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <main className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#C63C38]/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#C63C38]">
              <GraduationCap size={15} />
              MCPDP Learning
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#242625] sm:text-4xl">
              Explore MCPDP Modules
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
              Choose from our available professional development modules and
              continue building your knowledge and professional competence.
            </p>
          </div>
        </section>

        {/* Quick summary */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={<BookOpen size={19} />}
            label="Available Modules"
            value={String(modules.length)}
          />

          <SummaryCard
            icon={<CheckCircle2 size={19} />}
            label="Self-Paced Learning"
            value="100%"
          />

          <SummaryCard
            icon={<Clock3 size={19} />}
            label="Learn At Your Pace"
            value="24/7"
          />
        </section>

        {/* Module Grid */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#242625]">
                Available Modules
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a module to begin your MCPDP journey.
              </p>
            </div>

            <span className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm sm:inline-flex">
              {modules.length} modules
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => (
              <ModuleCard
                key={module._id}
                module={module}
                price={25000}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ModuleCard({ module, price, onPurchase }: ModuleCardProps) {
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
          <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
            <BookOpen size={42} strokeWidth={1.5} />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available
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

        {/* Bottom */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-400">Module Fee</p>

              <p className="mt-1 text-xl font-bold text-[#242625]">
                ₦{price.toLocaleString()}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onPurchase(module)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C63C38] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/15 transition-all hover:-translate-y-0.5 hover:bg-[#B63431]"
            >
              <ShoppingCart size={16} />
              Purchase
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SummaryCard({ icon, label, value }: SummaryCardProps) {
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

export default ModulesDisplay;
