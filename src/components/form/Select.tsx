import { forwardRef } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      icon,
      error,
      helperText,
      required,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {/* Label */}

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}

          {required && <span className="ml-1 text-[#C63C38]">*</span>}
        </label>

        {/* Select */}

        <div
          className={clsx(
            `
            relative
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

          {/* Select */}

          <select
            ref={ref}
            className={clsx(
              `
              h-full
              w-full
              appearance-none
              bg-transparent
              pr-8
              text-slate-800
              focus:outline-none
              `,
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Arrow */}

          <ChevronDown
            size={20}
            className="
              pointer-events-none
              absolute
              right-4
              text-slate-400
            "
          />
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

Select.displayName = "Select";

export default Select;
