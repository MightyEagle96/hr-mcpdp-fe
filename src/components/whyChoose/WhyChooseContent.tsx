import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhyChooseContent() {
  return (
    <div className="max-w-xl">
      <span
        className="
        inline-flex
        rounded-full
        bg-red-50
        px-5
        py-2
        text-sm
        font-semibold
        text-[#C63C38]
      "
      >
        WHY HRORBN MCPDP
      </span>

      <h2
        className="
        mt-8
        text-5xl
        font-bold
        leading-tight
        text-slate-900
        lg:text-6xl
      "
      >
        Everything You Need
        <span className="mt-2 block text-[#C63C38]">For Continuous</span>
        Professional Development
      </h2>

      <p
        className="
        mt-8
        text-lg
        leading-9
        text-slate-600
      "
      >
        The HRORBN Mandatory Continuing Professional Development platform has
        been carefully designed to support lifelong learning, strengthen
        professional competence, and simplify compliance with regulatory CPD
        requirements through a modern, flexible and secure learning experience.
      </p>

      <Link
        to="/courses"
        className="
        mt-10
        inline-flex
        items-center
        gap-3
        rounded-full
        bg-gradient-to-r
        from-[#C63C38]
        to-[#B63431]
        px-8
        py-4
        font-semibold
        text-white
        shadow-lg
        shadow-red-300/30
        transition-all
        duration-300
        hover:-translate-y-1
      "
      >
        Explore Courses
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
