import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";

import {
  Menu,
  X,
  House,
  BookOpen,
  Award,
  ArrowRight,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import { useAppUser } from "../../context/AppUserContext";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const { user } = useAppUser();

  const close = () => setOpen(false);

  const links = [
    {
      title: "Home",
      icon: <House size={20} />,
      href: "/",
    },
    {
      title: "Modules",
      icon: <BookOpen size={20} />,
      href: "/modules",
    },
    {
      title: "Login",
      icon: <ArrowRight size={20} />,
      href: "/login",
    },
    {
      title: "Register",
      icon: <User size={20} />,
      href: "/register",
    },
  ];

  const candidateLinks = [
    {
      title: "Home",
      icon: <House size={20} />,
      href: "/",
    },
    {
      title: "Modules",
      icon: <BookOpen size={20} />,
      href: "/modules",
    },
    {
      title: "My Modules",
      icon: <BookOpen size={20} />,
      href: "/mymodules",
    },
    {
      title: "My Certificates",
      icon: <Award size={20} />,
      href: "/mymodules",
    },
  ];
  const linksToDisplay = user?.role === "candidate" ? candidateLinks : links;

  return (
    <>
      <div className="lg:hidden">
        <IconButton onClick={() => setOpen(true)}>
          <Menu />
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={open}
        onClose={close}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "88vw", sm: 340 },
              maxWidth: "100vw",
              right: 0,
              top: 0,
              bottom: 0,
              boxSizing: "border-box",
              borderTopLeftRadius: 28,
              borderBottomLeftRadius: 28,
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(0,0,0,.15)",
            },
          },
        }}
      >
        <div className="w-72 p-8">
          <div className="mb-8 flex justify-end">
            <IconButton onClick={() => setOpen(false)}>
              <X />
            </IconButton>
          </div>

          <div className="flex flex-col gap-2">
            {linksToDisplay.map((link) => (
              <NavLink
                key={link.title}
                to={link.href}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  rounded-xl
                  px-4 py-3
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#C63C38] text-white"
                      : "text-slate-700 hover:bg-red-50 hover:text-[#C63C38]"
                  }
                `
                }
                onClick={close}
              >
                {link.icon}
                <span>{link.title}</span>
              </NavLink>
            ))}
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6">
            <AuthButtons variant="mobile" onAction={close} />
          </div>
        </div>
      </Drawer>
    </>
  );
}
