import { forwardRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  icon?: ReactNode;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, helperText, required, icon, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full">
        {/* Label */}

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}

          {required && <span className="ml-1 text-[#C63C38]">*</span>}
        </label>

        {/* Input */}

        <div
          className={clsx(
            `
            flex
            h-14
            items-center
            rounded-2xl
            border
            border-slate-300
            bg-white
            px-4
            transition-all
            duration-300
            focus-within:border-[#C63C38]
            focus-within:ring-4
            focus-within:ring-red-100
          `,
            error && "border-red-500 ring-4 ring-red-100",
          )}
        >
          {/* Left Icon */}

          <div className="mr-3 text-slate-400">
            {icon ?? <Lock size={18} />}
          </div>

          {/* Input */}

          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={clsx(
              `
                h-full
                w-full
                bg-transparent
                text-slate-800
                placeholder:text-slate-400
                focus:outline-none
              `,
              className,
            )}
            {...props}
          />

          {/* Toggle */}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              ml-3
              rounded-lg
              p-1
              text-slate-400
              transition-colors
              hover:text-[#C63C38]
            "
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Footer */}

        {error ? (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="mt-2 text-sm text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
