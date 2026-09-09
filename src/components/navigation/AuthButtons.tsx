import { LogOut, Mail } from "lucide-react";
import { useAppUser } from "../../context/AppUserContext";
import { Link } from "react-router-dom";

export default function AuthButtons() {
  const { user, logout } = useAppUser();

  // Logged-in interface
  if (user) {
    return (
      <div className="hidden items-center gap-4 lg:flex">
        {/* User Email */}

        <div
          className="
            flex
            max-w-[220px]
            items-center
            gap-2
            rounded-full
            border
            border-slate-200
            bg-white/80
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-600
            shadow-sm
            backdrop-blur-xl
          "
        >
          <Mail size={17} className="shrink-0 text-[#C63C38]" />

          <span className="truncate">{user.email}</span>
        </div>

        {/* Logout */}

        <button
          type="button"
          onClick={logout}
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-[#C63C38]
            to-[#B63431]
            px-6
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-red-500/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-xl
            hover:shadow-red-500/30
          "
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    );
  }

  // Guest interface
  return (
    <div className="hidden items-center gap-4 lg:flex">
      <Link
        to="/login"
        className="
          rounded-full
          border
          border-slate-300
          bg-white/80
          px-6
          py-2.5
          text-sm
          font-semibold
          text-slate-700
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-slate-400
          hover:bg-slate-100
        "
      >
        Login
      </Link>

      <Link
        to="/register"
        className="
          rounded-full
          bg-gradient-to-r
          from-[#C63C38]
          to-[#B63431]
          px-6
          py-2.5
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-red-500/20
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-xl
          hover:shadow-red-500/30
        "
      >
        Register
      </Link>
    </div>
  );
}
