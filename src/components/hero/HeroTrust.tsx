import { BadgeCheck } from "lucide-react";

const items = [
  "HRORBN Accredited",
  "Earn CPD Points",
  "Verifiable Certificates",
];

export default function HeroTrust() {
  return (
    <div className="mt-10 flex flex-wrap gap-6">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2 text-slate-600">
          <BadgeCheck size={18} className="text-green-600" />

          <span className="text-sm font-medium">{item}</span>
        </div>
      ))}
    </div>
  );
}
