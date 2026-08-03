import WhyChooseCard from "./WhyChooseCard";
import { whyChoose } from "../../data/whyChoose";
import WhyChooseContent from "./WhyChooseContent";

export default function WhyChoose() {
  return (
    <section className="bg-slate-50 py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
        {/* Left Side */}

        <WhyChooseContent />

        {/* Right Side */}

        <div className="grid gap-8 md:grid-cols-2">
          {whyChoose.map((item, index) => (
            <div
              key={item.title}
              className={`
                ${index % 2 === 1 ? "lg:translate-y-10" : ""}
              `}
            >
              <WhyChooseCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
