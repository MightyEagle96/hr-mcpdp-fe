import logo from "../../assets/logo.jpeg";

export default function Logo() {
  return (
    <div className="flex items-center gap-4 cursor-pointer">
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <img src={logo} alt="HRORBN" className="h-12 w-12 object-contain" />
      </div>

      <div className="hidden md:block">
        <h1 className="font-poppins text-lg font-bold text-slate-900">
          HRORBN
        </h1>

        <p className="text-xs text-slate-500">MCPDP Learning Portal</p>
      </div>
    </div>
  );
}
