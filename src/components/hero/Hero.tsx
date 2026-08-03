import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/40 to-white">
      {/* Background Blur */}
      <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-red-100/40 blur-[180px]" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pt-40 pb-24 lg:grid-cols-2">
        <HeroContent />

        <HeroIllustration />
      </div>
    </section>
  );
}
