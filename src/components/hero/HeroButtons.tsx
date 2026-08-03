import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      <Link
        to="/register"
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-gradient-to-r
          from-[#C63C38]
          to-[#B63431]
          px-8
          py-4
          font-semibold
          text-white
          shadow-xl
          shadow-red-300/30
          transition-all
          duration-300
          hover:-translate-y-1
        "
      >
        Register Now
        <ArrowRight size={18} />
      </Link>

      <Link
        to="/courses"
        className="
          rounded-full
          border
          border-slate-300
          bg-white
          px-8
          py-4
          font-semibold
          text-slate-700
          transition-all
          duration-300
          hover:border-[#C63C38]
          hover:text-[#C63C38]
        "
      >
        Explore Courses
      </Link>
    </div>
  );
}
