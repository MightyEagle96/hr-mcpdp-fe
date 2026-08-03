import { useEffect, useState } from "react";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 lg:px-6">
      <div
        className={`
      mx-auto
      flex
      h-20
      max-w-7xl
      items-center
      rounded-2xl
      px-6
      transition-all
      duration-500
      ${
        scrolled
          ? "border border-white/30 bg-white/75 shadow-xl backdrop-blur-2xl"
          : "bg-transparent"
      }
    `}
      >
        {/* Left */}
        <Logo />

        {/* Center */}
        <div className="hidden lg:flex flex-1 justify-center">
          <DesktopMenu />
        </div>

        {/* Right */}
        <div className="hidden lg:flex">
          <AuthButtons />
        </div>

        {/* Mobile */}
        <div className="ml-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
