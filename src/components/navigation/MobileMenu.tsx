import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";

import {
  Menu,
  X,
  House,
  BookOpen,
  Info,
  CircleHelp,
  Phone,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import AuthButtons from "./AuthButtons";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      title: "Home",
      icon: <House size={20} />,
      href: "/",
    },
    {
      title: "Courses",
      icon: <BookOpen size={20} />,
      href: "/courses",
    },
    {
      title: "About",
      icon: <Info size={20} />,
      href: "/about",
    },
    {
      title: "FAQs",
      icon: <CircleHelp size={20} />,
      href: "/faqs",
    },
    {
      title: "Contact",
      icon: <Phone size={20} />,
      href: "/contact",
    },
  ];

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
              width: 340,
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
            {links.map((link) => (
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
          <AuthButtons />
        </div>
      </Drawer>
    </>
  );
}
