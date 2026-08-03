import { statistics } from "../../data/statistics";
import StatisticCard from "./StatisticsCard";

export default function Statistics() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statistics.map((item) => (
            <StatisticCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
