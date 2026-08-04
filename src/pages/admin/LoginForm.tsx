import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/form/Input";
import PasswordInput from "../../components/form/PasswordInput";

export default function LoginForm() {
  return (
    <form className="space-y-6">
      <Input
        label="Email Address"
        placeholder="Enter your email address"
        icon={<Mail size={18} />}
        type="email"
        required
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        icon={<Lock size={18} />}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            className="
              h-4
              w-4
              rounded
              border-slate-300
              text-[#C63C38]
              focus:ring-[#C63C38]
            "
          />

          <span className="text-sm text-slate-600">Remember Me</span>
        </label>

        <Link
          to="/admin/forgot-password"
          className="
            text-sm
            font-medium
            text-[#C63C38]
            hover:underline
          "
        >
          Forgot Password?
        </Link>
      </div>

      <button
        className="
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-[#C63C38]
          to-[#B63431]
          py-4
          text-lg
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-xl
        "
      >
        Sign In
      </button>
    </form>
  );
}
