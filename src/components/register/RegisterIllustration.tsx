import illustration from "../../assets/illustration.png";

import { Award, BadgeCheck, BookOpen } from "lucide-react";

export default function RegisterIllustration() {
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
      "
    >
      {/* Background Decorations */}

      <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-blue-200/30 blur-[120px]" />

      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-red-100/40 blur-[140px]" />

      {/* Content */}

      <div className="relative z-10">
        {/* Badge */}

        <div className="inline-flex items-center rounded-full bg-red-50 px-5 py-2 text-sm font-semibold text-[#C63C38]">
          Health Records Officers Registration Board of Nigeria
        </div>

        {/* Heading */}

        <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900">
          Supporting Professional Excellence Through
          <span className="block text-[#C63C38]">Continuous Learning</span>
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-xl text-lg leading-9 text-slate-600">
          Register on the HRORBN Mandatory Continuing Professional Development
          (MCPDP) Portal to access accredited learning modules developed to
          strengthen professional competence in Health Records and Health
          Information Management while supporting compliance with the Board's
          Continuing Professional Development requirements.
        </p>
      </div>

      {/* Illustration */}

      <div className="relative z-10 mt-14 flex justify-center">
        <img
          src={illustration}
          alt="HRORBN MCPDP"
          className="w-full max-w-lg"
        />

        {/* Floating Card 1 */}

        <div
          className="
            absolute
            -left-8
            top-12
            rounded-2xl
            bg-white
            p-4
            shadow-xl
          "
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-[#C63C38]">
              <BookOpen size={22} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Accredited</p>

              <p className="text-sm text-slate-500">Learning Modules</p>
            </div>
          </div>
        </div>

        {/* Floating Card 2 */}

        <div
          className="
            absolute
            -right-8
            top-36
            rounded-2xl
            bg-white
            p-4
            shadow-xl
          "
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Award size={22} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Earn</p>

              <p className="text-sm text-slate-500">CPD Credits</p>
            </div>
          </div>
        </div>

        {/* Floating Card 3 */}

        <div
          className="
            absolute
            bottom-8
            left-10
            rounded-2xl
            bg-white
            p-4
            shadow-xl
          "
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <BadgeCheck size={22} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">Verifiable</p>

              <p className="text-sm text-slate-500">Certificates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
