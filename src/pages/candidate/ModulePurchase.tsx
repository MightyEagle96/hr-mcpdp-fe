// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function ModulePurchase() {
//   const { id } = useParams();

//   const [module, setModule] = useState<IModule | null>(null);

//   const findModule = async () => {
//     try {
//       const { data } = await httpService.get(`/module/find_module/${id}`);
//       setModule(data.data);
//     } catch (error) {
//       console.error("Failed to fetch module:", error);
//     }
//   };

//   useEffect(() => {
//     findModule();
//   }, []);
//   return <div></div>;
// }

// export default ModulePurchase;

import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { httpService } from "../../httpService";
import type { IModule } from "./ModulesDisplay";
import { useAppUser } from "../../context/AppUserContext";
import { toastError } from "../../components/CustomToast";

function ModulePurchase() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAppUser();

  const [module, setModule] = useState<IModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const findModule = async () => {
    try {
      setIsLoading(true);

      const { data } = await httpService.get(`/module/find_module/${id}`);

      setModule(data.data);
    } catch (error) {
      console.error("Failed to fetch module:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findModule();
  }, [id]);

  const handlePurchase = async () => {
    if (!module || !id) return;

    try {
      setIsPurchasing(true);

      const { data } = await httpService.post("/modulepurchase/purchase", {
        module: module._id,
        candidate: user?._id,
        amount: 25000,
        currency: "NGN",
      });

      if (data.success) {
        navigate(`/modules/${module._id}`);
      }
    } catch (error) {
      toastError(error);
      console.error("Failed to purchase module:", error);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isLoading) {
    return <ModulePurchaseSkeleton />;
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-[#F7F8F8] px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <BookOpen size={28} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#242625]">
            Module not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't find the module you're looking for.
          </p>

          <Link
            to="/candidate/modules"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#242625] px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  const price = 25000;

  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <main className="mx-auto max-w-[1250px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/modules"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#C63C38]"
        >
          <ArrowLeft size={17} />
          Back to Modules
        </Link>

        {/* Page */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left */}
          <div>
            {/* Module Image */}
            <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] bg-slate-200 shadow-sm">
              {module.imageUrl ? (
                <img
                  src={module.imageUrl}
                  alt={module.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <BookOpen size={48} />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6">
                <span className="rounded-lg bg-black/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  {module.code}
                </span>
              </div>
            </div>

            {/* Module Information */}
            <div className="mt-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#C63C38]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#C63C38]">
                <GraduationCap size={14} />
                MCPDP Module
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#242625] sm:text-4xl">
                {module.title}
              </h1>

              <p className="mt-4 text-base leading-8 text-slate-500">
                {module.description}
              </p>
            </div>

            {/* What You Get */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-[#242625]">
                What you'll get
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Benefit
                  title="Full Module Access"
                  description="Access all learning content in this module."
                />

                <Benefit
                  title="Structured Learning"
                  description="Work through units and topics in sequence."
                />

                <Benefit
                  title="Unit Assessments"
                  description="Complete assessments attached to each unit."
                />

                <Benefit
                  title="Progress Tracking"
                  description="Track your learning progress throughout the module."
                />
              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <aside>
            <div className="sticky top-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
              {/* Card Header */}
              <div className="border-b border-slate-100 bg-slate-50/70 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Module Purchase
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Get full access to this MCPDP module.
                </p>
              </div>

              <div className="p-6">
                {/* Price */}
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Module Fee
                  </p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-bold tracking-tight text-[#242625]">
                      ₦{price.toLocaleString()}
                    </span>

                    <span className="mb-1 text-sm text-slate-400">
                      one-time
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-7 rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-slate-500">
                      {module.title}
                    </span>

                    <span className="shrink-0 text-sm font-bold text-slate-800">
                      ₦{price.toLocaleString()}
                    </span>
                  </div>

                  <div className="my-4 border-t border-slate-200" />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Total</span>

                    <span className="text-xl font-bold text-[#242625]">
                      ₦{price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Purchase */}
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C63C38] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#B63431] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ShoppingBag size={18} />

                  {isPurchasing ? "Processing Purchase..." : "Purchase Module"}
                </button>

                {/* Security */}
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Your purchase gives you access to this module and its
                    associated learning content.
                  </p>
                </div>

                {/* Demo indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <CreditCard size={14} />
                  Secure payment processing
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

interface BenefitProps {
  title: string;
  description: string;
}

function Benefit({ title, description }: BenefitProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <CheckCircle2 size={17} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ModulePurchaseSkeleton() {
  return (
    <div className="min-h-screen bg-[#F7F8F8]">
      <main className="mx-auto max-w-[1250px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

        <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="aspect-[16/8] animate-pulse rounded-[2rem] bg-slate-200" />

            <div className="mt-8 space-y-4">
              <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-20 w-full animate-pulse rounded bg-slate-200" />
            </div>
          </div>

          <div className="h-[500px] animate-pulse rounded-3xl bg-slate-200" />
        </div>
      </main>
    </div>
  );
}

export default ModulePurchase;
