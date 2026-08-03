import RegisterForm from "../../../components/register/RegisterForm";
import RegisterIllustration from "../../../components/register/RegisterIllustration";

function RegisterPage() {
  return (
    <div>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <RegisterIllustration />

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
