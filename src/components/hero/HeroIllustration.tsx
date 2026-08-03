import illustration from "../../assets/illustration.png";

export default function HeroIllustration() {
  return (
    <div className="relative flex justify-center">
      <div
        className="
          relative
          rounded-[40px]
          border
          border-white/60
          bg-white/60
          p-6
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <img
          src={illustration}
          alt="HRORBN Learning"
          className="w-full max-w-2xl"
        />
      </div>
    </div>
  );
}
