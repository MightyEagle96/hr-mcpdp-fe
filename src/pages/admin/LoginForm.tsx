import { Lock, Mail, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/form/Input";
import PasswordInput from "../../components/form/PasswordInput";
import { httpService } from "../../httpService";
import { useState } from "react";
import { toastError } from "../../components/CustomToast";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await httpService.post("/admin/login_admin_account", loginData);

      window.location.assign("/");
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 sm:space-y-5" onSubmit={loginHandler}>
      {/* Email Address */}
      <Input
        label="Email Address"
        placeholder="Enter your email address"
        icon={<Mail size={18} />}
        type="email"
        required
        onChange={(e) =>
          setLoginData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      {/* Password */}
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        icon={<Lock size={18} />}
        required
        onChange={(e) =>
          setLoginData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link
          to="/admin/forgot-password"
          className="
            inline-flex min-h-9 items-center
            text-sm font-semibold text-[#C63C38]
            transition-colors hover:text-[#A32F2C]
            hover:underline
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#C63C38]
            focus-visible:ring-offset-2
          "
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className={`
          flex min-h-12 w-full items-center justify-center gap-2.5
          rounded-xl
          bg-gradient-to-r from-[#C63C38] to-[#B63431]
          px-4 py-3
          text-base font-semibold text-white
          shadow-md shadow-red-500/20
          transition-all duration-200
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#C63C38]
          focus-visible:ring-offset-2
          ${
            loading
              ? "cursor-not-allowed opacity-75"
              : "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          }
        `}
      >
        {loading ? (
          <>
            <LoaderCircle
              size={20}
              className="shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span>Signing In...</span>
          </>
        ) : (
          "Sign In"
        )}
      </button>

      <p className="text-center text-xs leading-5 text-slate-400">
        Secure administrator access to the HRORBN MCPDP Portal.
      </p>
    </form>
  );
}
