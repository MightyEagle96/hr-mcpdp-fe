import { Link } from "react-router-dom";

import Input from "../form/Input";
import { Lock, Mail, LoaderCircle } from "lucide-react";
import PasswordInput from "../form/PasswordInput";
import { useState } from "react";

import { toast } from "sonner";
import { ValidationSchema } from "../../pages/public/dataValidationSchema";
import { httpService } from "../../httpService";
import { toastError } from "../CustomToast";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const result = ValidationSchema.LoginValidator.safeParse(formData);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      await httpService.post("/candidate/login", formData);
      window.location.assign("/");
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        w-full min-w-0
        rounded-2xl border border-slate-200
        bg-white
        p-5 shadow-xl
        sm:rounded-3xl sm:p-7
        lg:rounded-[32px] lg:p-9
      "
    >
      {/* Header */}
      <div>
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-2xl sm:h-12 sm:w-12">
          👋
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome Back
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
          Sign in to continue your professional development journey through the
          HRORBN Mandatory Continuing Professional Development Portal.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={loginHandler}
        className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5"
      >
        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          icon={<Mail size={18} />}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          icon={<Lock size={18} />}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="
              inline-flex min-h-8 items-center
              text-sm font-semibold text-[#C63C38]
              transition-colors hover:text-[#A32F2C]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#C63C38]
              focus-visible:ring-offset-2
            "
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className={`
            mt-1 flex min-h-12 w-full items-center justify-center gap-2.5
            rounded-xl
            bg-gradient-to-r from-[#C63C38] to-[#B63431]
            px-4 py-3
            text-base font-semibold text-white
            shadow-md shadow-red-300/30
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
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 sm:my-7 sm:gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400 sm:text-sm">
          OR
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-sm text-slate-600">Don't have an account?</p>

        <Link
          to="/register"
          className="
            mt-1.5 inline-flex min-h-9 items-center justify-center
            font-semibold text-[#C63C38]
            transition-colors hover:text-[#A32F2C]
            hover:underline
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#C63C38]
            focus-visible:ring-offset-2
          "
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}
