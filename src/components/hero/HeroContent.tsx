import HeroButtons from "./HeroButtons";
import HeroTrust from "./HeroTrust";
import { ShieldCheck } from "lucide-react";

export default function HeroContent() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-semibold text-[#C63C38]">
        <ShieldCheck size={18} />
        Official HRORBN MCPDP Portal
      </div>

      <h1 className="mt-8 text-5xl font-bold leading-none text-slate-900 lg:text-7xl">
        Advancing
        <span className="block text-[#C63C38]">Health Records</span>
        Professionals
      </h1>

      <h2 className="mt-4 text-3xl font-semibold text-slate-700">
        Through Continuous Learning
      </h2>

      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
        Complete accredited Mandatory Continuing Professional Development
        (MCPDP) courses, earn CPD points, and maintain your professional
        standing through HRORBN's official online learning platform.
      </p>

      <HeroButtons />

      <HeroTrust />
    </div>
  );
}
