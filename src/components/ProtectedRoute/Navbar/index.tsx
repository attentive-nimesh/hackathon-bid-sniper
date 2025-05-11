import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.webp";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const linkBaseStyle = "transition-underline duration-200";
  const activeStyle = "underline";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1c2d41] text-white shadow-lg">
      {/* Logo Section */}
      <div
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
        aria-label="logo-button"
      >
        <img src={logo} alt="Logo" className="h-[3.5rem] w-auto" />
        <span className="text-xl font-bold tracking-wide ml-2">Bid Sniper</span>
      </div>

      {/* Navigation Links and Logout */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBaseStyle} ${isActive ? activeStyle : "hover:underline"}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/setup"
          className={({ isActive }) =>
            `${linkBaseStyle} ${isActive ? activeStyle : "hover:underline"}`
          }
        >
          Setup
        </NavLink>
        <Button
          variant="outline"
          className="text-black hover:bg-blue-700 hover:text-white transition-colors duration-200"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
