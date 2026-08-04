import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 via-blue-50/30 to-white px-6">
      <div className="max-w-2xl text-center">
        {/* Icon */}

        <div
          className="
            mx-auto
            flex
            h-36
            w-36
            items-center
            justify-center
            rounded-full
            bg-red-50
            shadow-lg
            shadow-red-100/50
          "
        >
          <SearchX size={72} className="text-[#C63C38]" strokeWidth={1.8} />
        </div>

        {/* Error Code */}

        <span className="mt-10 block text-7xl font-extrabold tracking-tight text-slate-900">
          404
        </span>

        {/* Heading */}

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          We Couldn't Find That Page
        </h1>

        {/* Description */}

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          The page you're looking for may have been moved, deleted, or the
          address you entered is incorrect. Let's help you get back on track.
        </p>

        {/* Actions */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-gradient-to-r
              from-[#C63C38]
              to-[#B63431]
              px-8
              py-4
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-300
              bg-white
              px-8
              py-4
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:bg-slate-100
            "
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
