import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

export default function RegisterForm() {
  return (
    <div
      className="
        rounded-[36px]
        border
        border-slate-200
        bg-white
        p-10
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

      <form className="mt-10 flex flex-col gap-6">
        <TextField
          fullWidth
          label="First Name"
          placeholder="Enter your first name"
        />

        <TextField
          fullWidth
          label="Last Name"
          placeholder="Enter your last name"
        />

        <TextField
          fullWidth
          label="Other Names"
          placeholder="Enter your other names"
        />

        <TextField
          fullWidth
          label="Professional Registration Number"
          placeholder="Enter your HRORBN Registration Number"
        />

        <TextField
          fullWidth
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
        />

        <TextField
          fullWidth
          label="Phone Number"
          placeholder="Enter your phone number"
        />

        <TextField fullWidth select label="State of Practice">
          {/* States */}
        </TextField>

        <TextField fullWidth type="password" label="Password" />

        <TextField fullWidth type="password" label="Confirm Password" />

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
          className="
      mt-2
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
    "
        >
          Create Account
        </button>
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
