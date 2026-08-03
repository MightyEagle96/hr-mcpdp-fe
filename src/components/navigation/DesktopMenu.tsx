// import { NavLink } from "react-router-dom";
// import { navigationLinks } from "../../data/navigation";

// export default function DesktopMenu() {
//   return (
//     <nav className="hidden lg:flex items-center gap-10">
//       {navigationLinks.map((item) => (
//         <NavLink
//           key={item.path}
//           to={item.path}
//           className={({ isActive }) =>
//             `
//             relative
//             font-medium
//             transition-all
//             duration-300
//             hover:text-[#C63C38]
//             ${isActive ? "text-[#C63C38]" : "text-slate-700"}
//             after:absolute
//             after:left-0
//             after:-bottom-2
//             after:h-[2px]
//             after:bg-[#C63C38]
//             after:transition-all
//             after:duration-300
//             ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
//           `
//           }
//         >
//           {item.title}
//         </NavLink>
//       ))}
//     </nav>
//   );
// }

import { NavLink } from "react-router-dom";
import { navigationLinks } from "../../data/navigation";

export default function DesktopMenu() {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      {navigationLinks.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `
            relative
            py-2
            font-medium
            text-[15px]
            transition-all
            duration-300
            hover:text-[#C63C38]
            ${isActive ? "text-[#C63C38]" : "text-slate-700"}

            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:bg-[#C63C38]
            after:transition-all
            after:duration-300

            ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
            `
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}
