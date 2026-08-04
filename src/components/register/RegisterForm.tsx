import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import Input from "../form/Input";
import { IdCard, Mail, Phone, ShieldCheck, User } from "lucide-react";
import Select from "../form/Select";
import { states } from "../../constants/states";
import PasswordInput from "../form/PasswordInput";
import { useState } from "react";
import { ValidationSchema } from "../../pages/public/dataValidationSchema";
import { toast } from "sonner";
import FormSection from "../form/FormSection";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    registrationNumber: "",
    stateOfPracticeId: 0,
    zoneId: 0,
    otherNames: "",
  });
  const [error, setError] = useState(false);

  const createAccountHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const result = ValidationSchema.SignUpValidator.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0];

      toast.error(firstError.message);
      console.log(firstError);
    }

    //console.log(formData);
  };
  return (
    <div
      className="
        rounded-[36px]
        border
        border-slate-200
        bg-white
        p-6 lg:p-10
        shadow-2xl
      "
    >
      {/* Header */}

      <div>
        <span className="text-4xl">👋</span>

        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          Create Your HRORBN Account
        </h2>

        <p className="mt-3 text-slate-600 leading-7">
          Complete the form below to begin your Mandatory Continuing
          Professional Development journey.
        </p>
      </div>

      {/* Form */}

      <form
        // onSubmit={createAccountHandler}
        // className="mt-10 flex flex-col gap-6"
        onSubmit={createAccountHandler}
        className="mt-10 space-y-8"
      >
        <FormSection
          title="Personal Information"
          description="Provide your personal and contact details."
          icon={<User size={22} />}
        >
          <Input
            required
            label="First Name"
            icon={<User size={18} />}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />

          <Input
            required
            label="Last Name"
            icon={<User size={18} />}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />

          <Input
            label="Other Names"
            icon={<User size={18} />}
            onChange={(e) =>
              setFormData({ ...formData, otherNames: e.target.value })
            }
          />

          <Input
            label="Email Address"
            icon={<Mail size={18} />}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <Input
            label="Phone Number"
            icon={<Phone size={18} />}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </FormSection>

        <FormSection
          title="Professional Information"
          description="Provide your HRORBN registration details."
          icon={<IdCard size={22} />}
        >
          <Input
            required
            label="Professional Registration Number"
            icon={<IdCard size={18} />}
            onChange={(e) =>
              setFormData({
                ...formData,
                registrationNumber: e.target.value,
              })
            }
          />

          <Select
            label="State of Practice"
            required
            options={[
              { label: "Select State", value: "" },
              ...states.map((state) => ({
                label: state.name,
                value: state.id,
              })),
            ]}
            onChange={(e) => {
              const stateOfPracticeId = Number(e.target.value);

              const selectedState = states.find(
                (s) => s.id === stateOfPracticeId,
              );

              setFormData({
                ...formData,
                stateOfPracticeId,
                zoneId: selectedState?.zoneId ?? 0,
              });
            }}
          />
        </FormSection>

        <FormSection
          title="Account Security"
          description="Choose a secure password to protect your account."
          icon={<ShieldCheck size={22} />}
        >
          <PasswordInput
            label="Password"
            required
            helperText="Password must be at least 8 characters long."
            error={error ? "Passwords do not match" : ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <PasswordInput
            label="Confirm Password"
            required
            onBlur={(e) => setError(e.target.value !== formData.password)}
          />
        </FormSection>

        <FormSection
          title="Terms & Conditions"
          description="Please review and accept the terms before creating your account."
        >
          <FormControlLabel
            control={<Checkbox />}
            label={
              <span className="text-sm leading-6 text-slate-600">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-medium text-[#C63C38] hover:underline"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="font-medium text-[#C63C38] hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            }
          />

          <button
            type="submit"
            disabled={error}
            className="
      w-full
      rounded-2xl
      bg-gradient-to-r
      from-[#C63C38]
      to-[#B63431]
      py-4
      text-lg
      font-semibold
      text-white
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:shadow-xl
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
          >
            Create Account
          </button>
        </FormSection>
      </form>

      {/* Footer */}

      <div className="mt-8 text-center">
        <p className="text-slate-600">Already have an account?</p>

        <Link
          to="/login"
          className="
            mt-2
            inline-block
            font-semibold
            text-[#C63C38]
            hover:underline
          "
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
