import { LoaderCircle } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = "Preparing your learning experience...",
}: LoadingScreenProps) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-slate-950
        px-6
      "
    >
      {/* Background glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#C63C38]/10
          blur-[120px]
        "
      />

      {/* Decorative circles */}

      <div
        className="
          absolute
          h-[700px]
          w-[700px]
          rounded-full
          border
          border-white/5
        "
      />

      <div
        className="
          absolute
          h-[520px]
          w-[520px]
          rounded-full
          border
          border-white/5
        "
      />

      {/* Content */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          max-w-md
          flex-col
          items-center
          text-center
        "
      >
        {/* Logo mark */}

        <div className="relative">
          {/* Pulse */}

          <div
            className="
              absolute
              inset-0
              animate-ping
              rounded-full
              bg-[#C63C38]/20
            "
          />

          {/* Outer circle */}

          <div
            className="
              relative
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-3xl
              border
              border-white/10
              bg-white/5
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <LoaderCircle
              size={48}
              className="
                animate-spin
                text-[#C63C38]
              "
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Brand */}

        <div className="mt-10">
          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            HRORBN MCPDP
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-slate-400
            "
          >
            {message}
          </p>
        </div>

        {/* Progress */}

        <div className="mt-8 w-full max-w-xs">
          <div
            className="
              h-1.5
              overflow-hidden
              rounded-full
              bg-white/10
            "
          >
            <div
              className="
                h-full
                w-1/2
                animate-[loading_1.5s_ease-in-out_infinite]
                rounded-full
                bg-gradient-to-r
                from-[#C63C38]
                via-[#E85A55]
                to-[#C63C38]
              "
            />
          </div>
        </div>

        {/* Footer */}

        <p
          className="
            mt-12
            text-xs
            tracking-wide
            text-slate-500
          "
        >
          Mandatory Continuing Professional Development Programme
        </p>
      </div>
    </div>
  );
}
