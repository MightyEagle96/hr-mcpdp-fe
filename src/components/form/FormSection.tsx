import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function FormSection({
  title,
  description,
  icon,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4 lg:p-6">
      {/* Header */}

      <div className="flex items-start gap-4">
        {icon && (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#C63C38]/10
              text-[#C63C38]
            "
          >
            {icon}
          </div>
        )}

        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>

          {description && (
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
