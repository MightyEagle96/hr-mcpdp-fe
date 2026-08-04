import { Link } from "react-router-dom";

import Input from "../form/Input";
import { Lock, Mail } from "lucide-react";
import PasswordInput from "../form/PasswordInput";
import { useState } from "react";

import { toast } from "sonner";
import { ValidationSchema } from "../../pages/public/dataValidationSchema";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const result = ValidationSchema.LoginValidator.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      toast.error(firstError.message);
      console.log(firstError);
    }

    console.log(formData);
  };

  return (
    <div
      className="
        rounded-[36px]
        border
        border-slate-200
        bg-white
        p-10
        shadow-2xl
      "
    >
      {/* Header */}

      <div>
        <span className="text-4xl">👋</span>

        <h2 className="mt-3 text-3xl font-bold text-slate-900">Welcome Back</h2>

        <p className="mt-3 leading-7 text-slate-600">
          Sign in to continue your professional development journey through the
          HRORBN Mandatory Continuing Professional Development Portal.
        </p>
      </div>

      {/* Form */}

      <form onSubmit={loginHandler} className="mt-10 flex flex-col gap-6">
        {/* Email */}

        <Input
          label="Email Address"
          type="email"
          icon={<Mail size={18} />}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          icon={<Lock size={18} />}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {/* Remember Me + Forgot Password */}

        <div className="flex items-center justify-between">
          {/* <FormControlLabel control={<Checkbox />} label="Remember Me" /> */}

          <Link
            to="/forgot-password"
            className="
              text-sm
              font-semibold
              text-[#C63C38]
              transition-colors
              hover:text-[#A32F2C]
            "
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="
            mt-2
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-[#C63C38]
            to-[#B63431]
            py-4
            text-lg
            font-semibold
            text-white
            shadow-lg
            shadow-red-300/30
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-xl
          "
        >
          Sign In
        </button>
      </form>

      {/* Divider */}

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-sm text-slate-400">OR</span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Footer */}

      <div className="text-center">
        <p className="text-slate-600">Don't have an account?</p>

        <Link
          to="/register"
          className="
            mt-2
            inline-block
            font-semibold
            text-[#C63C38]
            transition-colors
            hover:text-[#A32F2C]
            hover:underline
          "
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}
