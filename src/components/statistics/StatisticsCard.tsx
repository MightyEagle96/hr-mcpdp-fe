import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export default function StatisticCard({ icon: Icon, title, subtitle }: Props) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[#C63C38]/20
        hover:shadow-xl
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-red-50
          text-[#C63C38]
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        <Icon size={28} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-slate-600">{subtitle}</p>
    </div>
  );
}
