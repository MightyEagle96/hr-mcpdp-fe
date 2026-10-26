// import { LogOut, Mail } from "lucide-react";
// import { useAppUser } from "../../context/AppUserContext";
// import { Link } from "react-router-dom";

// export default function AuthButtons() {
//   const { user, logout } = useAppUser();

//   // Logged-in interface
//   if (user) {
//     return (
//       <div className="hidden items-center gap-4 lg:flex">
//         {/* User Email */}

//         <div
//           className="
//             flex
//             max-w-[220px]
//             items-center
//             gap-2
//             rounded-full
//             border
//             border-slate-200
//             bg-white/80
//             px-4
//             py-2.5
//             text-sm
//             font-medium
//             text-slate-600
//             shadow-sm
//             backdrop-blur-xl
//           "
//         >
//           <Mail size={17} className="shrink-0 text-[#C63C38]" />

//           <span className="truncate">{user.email}</span>
//         </div>

//         {/* Logout */}

//         <button
//           type="button"
//           onClick={logout}
//           className="
//             flex
//             items-center
//             gap-2
//             rounded-full
//             bg-gradient-to-r
//             from-[#C63C38]
//             to-[#B63431]
//             px-6
//             py-2.5
//             text-sm
//             font-semibold
//             text-white
//             shadow-lg
//             shadow-red-500/20
//             transition-all
//             duration-300
//             hover:-translate-y-0.5
//             hover:shadow-xl
//             hover:shadow-red-500/30
//           "
//         >
//           <LogOut size={17} />
//           Logout
//         </button>
//       </div>
//     );
//   }

//   // Guest interface
//   return (
//     <div className="hidden items-center gap-4 lg:flex">
//       <Link
//         to="/login"
//         className="
//           rounded-full
//           border
//           border-slate-300
//           bg-white/80
//           px-6
//           py-2.5
//           text-sm
//           font-semibold
//           text-slate-700
//           transition-all
//           duration-300
//           hover:-translate-y-0.5
//           hover:border-slate-400
//           hover:bg-slate-100
//         "
//       >
//         Login
//       </Link>

//       <Link
//         to="/register"
//         className="
//           rounded-full
//           bg-gradient-to-r
//           from-[#C63C38]
//           to-[#B63431]
//           px-6
//           py-2.5
//           text-sm
//           font-semibold
//           text-white
//           shadow-lg
//           shadow-red-500/20
//           transition-all
//           duration-300
//           hover:-translate-y-0.5
//           hover:shadow-xl
//           hover:shadow-red-500/30
//         "
//       >
//         Register
//       </Link>
//     </div>
//   );
// }

import { LogOut, Mail } from "lucide-react";
import { useAppUser } from "../../context/AppUserContext";
import { Link } from "react-router-dom";

type AuthButtonsProps = {
  variant?: "desktop" | "mobile";
  onAction?: () => void;
};

export default function AuthButtons({
  variant = "desktop",
  onAction,
}: AuthButtonsProps) {
  const { user, logout } = useAppUser();

  const isMobile = variant === "mobile";

  const handleLogout = async () => {
    await logout();
    onAction?.();
  };

  // Logged-in interface
  if (user) {
    return (
      <div
        className={
          isMobile
            ? "flex w-full flex-col gap-3"
            : "hidden items-center gap-4 lg:flex"
        }
      >
        {/* User email */}
        <div
          className={`flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm ${
            isMobile
              ? "w-full"
              : "max-w-[220px] rounded-full bg-white/80 py-2.5 backdrop-blur-xl"
          }`}
        >
          <Mail size={17} className="shrink-0 text-[#C63C38]" />
          <span className="truncate">{user.email}</span>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C63C38] to-[#B63431] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:shadow-xl ${
            isMobile
              ? "w-full"
              : "rounded-full py-2.5 hover:-translate-y-0.5 hover:shadow-red-500/30"
          }`}
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    );
  }

  // Guest interface
  return (
    <div
      className={
        isMobile
          ? "flex w-full flex-col gap-3"
          : "hidden items-center gap-4 lg:flex"
      }
    >
      <Link
        to="/login"
        onClick={onAction}
        className={`flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 ${
          isMobile ? "w-full" : "rounded-full py-2.5 hover:-translate-y-0.5"
        }`}
      >
        Login
      </Link>

      <Link
        to="/register"
        onClick={onAction}
        className={`flex items-center justify-center rounded-xl bg-gradient-to-r from-[#C63C38] to-[#B63431] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:shadow-xl ${
          isMobile
            ? "w-full"
            : "rounded-full py-2.5 hover:-translate-y-0.5 hover:shadow-red-500/30"
        }`}
      >
        Register
      </Link>
    </div>
  );
}
