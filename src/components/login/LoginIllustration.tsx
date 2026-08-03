import illustration from "../../assets/illustration.png";

import { Award, BadgeCheck, BookOpen } from "lucide-react";

export default function LoginIllustration() {
  return (
    <div
      className="
        relative
        hidden
        overflow-hidden
        rounded-[40px]
        border
        border-slate-200
        bg-gradient-to-br
        from-white
        via-slate-50
        to-blue-50/40
        p-12
        lg:flex
        lg:flex-col
        justify-between
      "
    >
      {/* Decorative Background */}

      <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-blue-200/30 blur-[120px]" />

      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-red-100/40 blur-[140px]" />

      {/* Content */}

      <div className="relative z-10">
        {/* Badge */}

        <div className="inline-flex items-center rounded-full bg-red-50 px-5 py-2 text-sm font-semibold text-[#C63C38]">
          Welcome Back
        </div>

        {/* Heading */}

        <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900">
          Continue Your
          <span className="block text-[#C63C38]">Professional</span>
          Development
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-xl text-lg leading-9 text-slate-600">
          Sign in to continue your Mandatory Continuing Professional Development
          activities, access accredited learning modules, monitor your CPD
          progress, and download your certificates whenever you need them.
        </p>
      </div>

      {/* Illustration */}

      <div className="relative z-10 mt-14 flex justify-center">
        <img
          src={illustration}
          alt="HRORBN MCPDP"
          className="w-full max-w-lg"
        />

        {/* Card 1 */}

        <div className="absolute -left-8 top-12 rounded-2xl bg-white p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-[#C63C38]">
              <BookOpen size={22} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Continue</p>

              <p className="text-sm text-slate-500">Learning Modules</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}

        <div className="absolute -right-8 top-36 rounded-2xl bg-white p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Award size={22} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Track</p>

              <p className="text-sm text-slate-500">CPD Progress</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}

        <div className="absolute bottom-8 left-10 rounded-2xl bg-white p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <BadgeCheck size={22} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Download</p>

              <p className="text-sm text-slate-500">Certificates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
