import LoginForm from "../../../components/login/LoginForm";
import LoginIllustration from "../../../components/login/LoginIllustration";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-white">
      <div className="mx-auto max-w-7xl px-6 py-36">
        <div className="grid items-center gap-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <LoginIllustration />
          </div>

          <div className="lg:col-span-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
