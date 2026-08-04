import { Home, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 via-red-50/20 to-white px-6">
      <div className="max-w-2xl text-center">
        <div
          className="
            mx-auto
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-red-50
            text-[#C63C38]
          "
        >
          <ShieldAlert size={56} />
        </div>

        <span className="mt-10 block text-7xl font-extrabold text-[#C63C38]">
          403
        </span>

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          Access Restricted
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          You do not currently have permission to access this resource. If you
          believe this is an error, please contact your system administrator.
        </p>

        <Link
          to="/dashboard"
          className="
            mt-10
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
            shadow-lg
            transition
            hover:-translate-y-1
          "
        >
          <Home size={18} />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
