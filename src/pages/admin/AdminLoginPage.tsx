import LoginForm from "./LoginForm";
import logo from "../../assets/logo.jpeg";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10">
      {/* Background Decorations */}

      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-100 blur-[180px]" />

      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-100 blur-[180px]" />

      {/* Login Card */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-lg
          rounded-[36px]
          border
          border-slate-200
          bg-white
          p-8
          shadow-2xl
          lg:p-12
        "
      >
        {/* Logo */}

        <div className="flex justify-center">
          <img src={logo} alt="HRORBN" className="h-24 object-contain" />
        </div>

        {/* Heading */}

        <div className="mt-8 text-center">
          <span
            className="
              inline-flex
              rounded-full
              bg-red-50
              px-4
              py-2
              text-sm
              font-semibold
              text-[#C63C38]
            "
          >
            HRORBN Operations Centre
          </span>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Administrator Login
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Sign in using your administrator credentials to manage learning
            modules, assessments, learners and system administration.
          </p>
        </div>

        {/* Form */}

        <div className="mt-10">
          <LoginForm />
        </div>

        {/* Footer */}

        <div className="mt-10 border-t border-slate-200 pt-6 text-center">
          <p className="text-sm text-slate-500">
            Secure access to the HRORBN Mandatory Continuing Professional
            Development Management System.
          </p>
        </div>
      </div>
    </div>
  );
}
