// import { useState } from "react";
// import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
// import { motion } from "framer-motion"; // Import Framer Motion
// import { SidebarData } from "../assets/JSON/SidebarData";
// // import "../assets/CSS/Components/StdSidebar.css";
// export const Sidebar = ({ setPageTitle, isSidebarOpen, navigateTo }) => {
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (id) => {
//     setOpenMenu(openMenu === id ? null : id);
//   };

//   return (
//     <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//       {SidebarData.map((menu) => {
//         const IconComponent = menu.menuIcon; // Get the icon component reference
//         const isOpen = openMenu === menu.id;

//         return (
//           <div key={menu.id} className="menu-item">
//             {menu.subMenu.length > 0 ? (
//               <div
//                 className="menu-item-title"
//                 onClick={() => toggleMenu(menu.id)}
//               >
//                 {IconComponent && <IconComponent />}
//                 <span className="drop">{menu.menuTitle}</span>
//                 <div className="toggleIcon">
//                   {" "}
//                   {isOpen ? <HiOutlineMinusSm /> : <HiOutlinePlusSm />}{" "}
//                 </div>
//               </div>
//             ) : (
//               <a
//                 href="#"
//                 className="menu-item-title"
//                 onClick={(e) => {
//                   e.preventDefault(); // Prevent default link behavior
//                   setPageTitle(menu.menuTitle);
//                   navigateTo(menu.menuLink[0]); // Use navigateTo to change the page
//                 }}
//               >
//                 {IconComponent && <IconComponent />}
//                 <span className="drop">{menu.menuTitle}</span>
//               </a>
//             )}

//             {/* Smoothly animate submenu open/close */}
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={
//                 isOpen
//                   ? { height: "auto", opacity: 1 }
//                   : { height: 0, opacity: 0 }
//               }
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="submenu-container"
//             >
//               {isOpen && (
//                 <SubMenu
//                   subMenu={menu.subMenu}
//                   menuLink={menu.menuLink}
//                   setPageTitle={setPageTitle}
//                   navigateTo={navigateTo} // Pass navigateTo to SubMenu
//                 />
//               )}
//             </motion.div>
//           </div>
//         );
//       })}
//     </aside>
//   );
// };

// const SubMenu = ({ subMenu, menuLink, setPageTitle, navigateTo }) => {
//   return (
//     <div className="sub-menu">
//       {subMenu.map((item, index) => (
//         <div key={index} className="sub-item">
//           <a
//             href="#"
//             onClick={(e) => {
//               e.preventDefault(); // Prevent default link behavior
//               setPageTitle(item);
//               navigateTo(menuLink[index]); // Use navigateTo to change the page
//             }}
//           >
//             {item}
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };


import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import { motion } from "framer-motion"; // Import Framer Motion
import { SidebarData } from "../assets/JSON/SidebarData";

import "/src/assets/CSS/Components/Sidebar.css";

export const Sidebar = ({ setPageTitle, isSidebarOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      {SidebarData.map((menu) => {
        const IconComponent = menu.menuIcon; // Get the icon component reference
        const isOpen = openMenu === menu.id;

        return (
          <div key={menu.id} className="menu-item">
            {menu.subMenu.length > 0 ? (
              <div className="menu-item-title" onClick={() => toggleMenu(menu.id)}>
                {IconComponent && <IconComponent />}
                <span className="drop">{menu.menuTitle}</span>
                <div className="toggleIcon"> {isOpen ? <HiOutlineMinusSm /> : <HiOutlinePlusSm />} </div>
              </div>
            ) : (
              <Link
                to={menu.menuLink[0]}
                className="menu-item-title"
                onClick={() => setPageTitle(menu.menuTitle)}
              >
                {IconComponent && <IconComponent />}
                <span className="drop">{menu.menuTitle}</span>
              </Link>
            )}

            {/* Smoothly animate submenu open/close */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="submenu-container"
            >
              {isOpen && (
                <SubMenu
                  subMenu={menu.subMenu}
                  menuLink={menu.menuLink}
                  setPageTitle={setPageTitle}
                />
              )}
            </motion.div>
          </div>
        );
      })}
    </aside>
  );
};

const SubMenu = ({ subMenu, menuLink, setPageTitle }) => {
  return (
    <div className="sub-menu">
      {subMenu.map((item, index) => (
        <div key={index} className="sub-item">
          <Link to={menuLink[index] || "#"} onClick={() => setPageTitle(item)}>
            {item}
          </Link>
        </div>
      ))}
    </div>
  );
};
