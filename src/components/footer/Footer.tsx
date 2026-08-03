import { Mail, Phone, MapPin } from "lucide-react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Top */}

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Brand */}

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">
              HRORBN
              <span className="text-[#C63C38]"> MCPDP</span>
            </h2>

            <p className="mt-6 max-w-md leading-8 text-slate-300">
              The official Mandatory Continuing Professional Development
              platform of the Health Records Officers Registration Board of
              Nigeria, providing accredited learning experiences that strengthen
              professional competence and support lifelong learning.
            </p>

            {/* Social */}
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="font-bold">Quick Links</h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link to="/">Home</Link>

              <Link to="/about">About</Link>

              <Link to="/modules">Learning Modules</Link>

              <Link to="/register">Register</Link>

              <Link to="/login">Login</Link>
            </div>
          </div>

          {/* Resources */}

          <div>
            <h3 className="font-bold">Resources</h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link to="/faq">FAQs</Link>

              <Link to="/contact">Contact Us</Link>

              <Link to="/privacy-policy">Privacy Policy</Link>

              <Link to="/terms">Terms of Use</Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="font-bold">Contact</h3>

            <div className="mt-6 space-y-5 text-slate-300">
              <div className="flex gap-3">
                <MapPin size={18} />

                <span>Abuja, Nigeria</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />

                <span>info@hrorbn.gov.ng</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />

                <span>+234 XXX XXX XXXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="my-10 h-px bg-slate-700" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-6 text-center text-sm text-slate-400 lg:flex-row">
          <p>
            © {new Date().getFullYear()} Health Records Officers Registration
            Board of Nigeria. All Rights Reserved.
          </p>

          <p>
            Designed & Developed by{" "}
            <span className="font-semibold text-white">
              Quanby Solutions Ltd.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
