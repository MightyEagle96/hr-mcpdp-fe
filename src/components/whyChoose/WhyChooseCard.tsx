import type { IWhyChoose } from "../../data/whyChoose";

interface Props {
  item: IWhyChoose;
}

export default function WhyChooseCard({ item }: Props) {
  const Icon = item.icon;

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-slate-200
      bg-gradient-to-b
      from-white
      to-slate-50
      p-8
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-red-100
      hover:shadow-2xl
    "
    >
      {/* Accent Line */}

      <div
        className="
        absolute
        left-0
        top-0
        h-1
        w-0
        bg-gradient-to-r
        from-[#C63C38]
        to-[#B63431]
        transition-all
        duration-500
        group-hover:w-full
      "
      />

      {/* Decorative Circle */}

      <div
        className="
        absolute
        -right-12
        -top-12
        h-32
        w-32
        rounded-full
        border
        border-red-100
        opacity-20
      "
      />

      {/* Icon */}

      <div
        className="
        flex
        h-18
        w-18
        items-center
        justify-center
        rounded-3xl
        bg-gradient-to-br
        from-red-50
        to-white
        text-[#C63C38]
        transition-all
        duration-300
        group-hover:scale-110
        group-hover:bg-[#C63C38]
        group-hover:text-white
      "
      >
        <Icon size={34} />
      </div>

      {/* Title */}

      <h3 className="mt-8 text-2xl font-bold text-slate-900">{item.title}</h3>

      {/* Description */}

      <p className="mt-5 leading-8 text-slate-600">{item.description}</p>
    </div>
  );
}
