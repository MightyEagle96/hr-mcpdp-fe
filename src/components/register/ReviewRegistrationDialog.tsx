import {
  AlertTriangle,
  CheckCircle2,
  IdCard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { states } from "../../constants/states";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  registrationNumber: string;
  stateOfPracticeId: number;
  zoneId: number;
  otherNames: string;
  password: string;
}

interface ReviewRegistrationDialogProps {
  open: boolean;
  data: RegistrationData;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ReviewRegistrationDialog({
  open,
  data,
  onClose,
  onConfirm,
  loading = false,
}: ReviewRegistrationDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}

      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}

      <div
        className="
          relative
          z-10
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-[#C63C38]
              "
            >
              <CheckCircle2 size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Review Your Information
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Please confirm that the information below is correct before
                creating your account.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              disabled:cursor-not-allowed
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}

        <div className="max-h-[65vh] overflow-y-auto px-5 py-6 sm:px-7">
          <div className="space-y-5">
            {/* Personal Information */}

            <ReviewSection
              icon={<User size={20} />}
              title="Personal Information"
            >
              <ReviewItem label="First Name" value={data.firstName} />

              <ReviewItem label="Last Name" value={data.lastName} />

              <ReviewItem label="Other Names" value={data.otherNames || "—"} />

              <ReviewItem
                icon={<Mail size={15} />}
                label="Email Address"
                value={data.email}
              />

              <ReviewItem
                icon={<Phone size={15} />}
                label="Phone Number"
                value={data.phoneNumber}
              />
            </ReviewSection>

            {/* Professional Information */}

            <ReviewSection
              icon={<IdCard size={20} />}
              title="Professional Information"
            >
              <ReviewItem
                label="Registration Number"
                value={data.registrationNumber}
              />

              <ReviewItem
                icon={<MapPin size={15} />}
                label="State of Practice"
                value={
                  states.find((s) => s.id === data.stateOfPracticeId)?.name ||
                  "—"
                }
              />
            </ReviewSection>

            {/* Account Security */}

            <ReviewSection
              icon={<ShieldCheck size={20} />}
              title="Account Security"
            >
              <ReviewItem label="Password" value="••••••••" />

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 size={17} />

                <span>
                  Your password will be securely encrypted before being stored.
                </span>
              </div>
            </ReviewSection>

            {/* Warning */}

            <div
              className="
                flex
                gap-3
                rounded-2xl
                border
                border-amber-200
                bg-amber-50
                p-4
              "
            >
              <AlertTriangle
                size={20}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <p className="text-sm leading-6 text-amber-800">
                Please ensure your professional registration number and personal
                information are accurate. These details may be used to identify
                your professional record.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-slate-200
            bg-slate-50/70
            px-5
            py-5
            sm:flex-row
            sm:justify-end
            sm:px-7
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-6
              py-3.5
              font-semibold
              text-slate-700
              transition
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Go Back
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-[#C63C38]
              to-[#B63431]
              px-6
              py-3.5
              font-semibold
              text-white
              shadow-lg
              shadow-red-500/20
              transition-all
              hover:-translate-y-0.5
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Creating Account..." : "Confirm & Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Review Section                                                             */
/* -------------------------------------------------------------------------- */

interface ReviewSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ReviewSection({ title, icon, children }: ReviewSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#C63C38]">
          {icon}
        </div>

        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Review Item                                                                */
/* -------------------------------------------------------------------------- */

interface ReviewItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function ReviewItem({ label, value, icon }: ReviewItemProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="mt-1 flex items-center gap-2">
        {icon && <span className="text-slate-400">{icon}</span>}

        <p className="break-words text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}
