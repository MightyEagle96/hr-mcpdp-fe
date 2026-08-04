import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightIcon, required, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label */}

        <label
          className="
            mb-2
            block
            text-sm
            font-semibold
            text-slate-700
          "
        >
          {label}

          {required && <span className="ml-1 text-[#C63C38]">*</span>}
        </label>

        {/* Input Container */}

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

          {icon && <div className="mr-3 text-slate-400">{icon}</div>}

          {/* Input */}

          <input
            ref={ref}
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

          {/* Right Icon */}

          {rightIcon && <div className="ml-3">{rightIcon}</div>}
        </div>

        {/* Error */}

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
