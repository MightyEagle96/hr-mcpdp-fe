import { Link } from "react-router-dom";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="rounded-full border border-slate-300 bg-white/80 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="rounded-full bg-gradient-to-r from-[#C63C38] to-[#B63431] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/30"
      >
        Register
      </Link>
    </div>
  );
}
