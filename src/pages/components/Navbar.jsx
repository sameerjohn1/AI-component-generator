import React from "react";
import { FaUser } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";
import { useTheme } from "../../theme/ThemeContext.js.jsx"; // Sahi path dein

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Light mode mein background white aur text black, dark mode mein ulta */}
      <div
        className={`nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-200 dark:border-gray-800  ${
          theme === "light" ? "bg-white" : "bg-black"
        } text-black dark:text-white`}
      >
        <div className="logo">
          <h3 className="text-[25px] font-[700] sp-text">GenUI</h3>
        </div>

        <div className="icons flex items-center gap-[15px]">
          {/* Theme toggle icon */}
          <div className="icon cursor-pointer" onClick={toggleTheme}>
            {theme === "light" ? <HiSun size={20} /> : <HiMoon size={20} />}
          </div>
          <div className="icon">
            <FaUser />
          </div>
          <div className="icon">
            <RiSettings3Fill />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
