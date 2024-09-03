import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";

const links = [
  { to: "/", title: "Home" },
  { to: "/about", title: "About" },
  { to: "/contact", title: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
    document.body.style.overflow = navOpen ? "auto" : "hidden";
  };

  //handle logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    window.location = "/";
  };

  return (
    <header className="w-full border-b border-neutral-800 ">
      <div className="lg:w-[80%] h-[10vh] mx-auto px-4 flex justify-between items-center">
        {/* Logo and Desktop Navigation */}
        <NavLink to="/" className="flex items-center gap-2">
          <h1 className="text-2xl flex items-center">Dev.News</h1>
        </NavLink>
        <div className="hidden lg:flex items-center gap-6">
          {links.map(({ to, title }) => (
            <NavLink
              to={to}
              key={to}
              className="btn flex flex-col relative group hover:"
            >
              {title}
              <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-center transition-transform scale-x-0 group-hover:scale-x-100"></span>
            </NavLink>
          ))}
          {/* User Dropdown */}
          <div className="relative">
            {auth?.user ? (
              <button
                className="btn flex flex-col relative group"
                onClick={toggleDropdown}
              >
                {auth?.user?.name}
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-center transition-transform scale-x-0 group-hover:scale-x-100"></span>
              </button>
            ) : (
              <NavLink to="/login" className="btn flex flex-col relative group">
                Login{" "}
                <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white transform origin-center transition-transform scale-x-0 group-hover:scale-x-100"></span>
              </NavLink>
            )}

            {isOpen && (
              <div className="absolute right-0 top-12 z-10 mt-2 w-48 bg-neutral-900 rounded-lg shadow-lg border border-neutral-800">
                {auth?.user?.role === 1 ? (
                  <>
                    <NavLink
                      to="/admin/dashboard"
                      className="block px-4 py-2 rounded-md hover:bg-neutral-800"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-start px-4 py-2 rounded-md hover:bg-neutral-800"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-start px-4 py-2 rounded-md hover:bg-neutral-800"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          {!navOpen ? (
            <RiMenu4Fill
              className="w-10 h-8 p-1 cursor-pointer "
              size={20}
              onClick={toggleNav}
            />
          ) : null}

          {/* Mobile Navigation Menu */}
          {navOpen && (
            <div className="fixed z-50 top-0 right-0 w-[70%] h-full bg-black p-5">
              <div className="flex flex-col items-end gap-5">
                {links.map(({ to, title }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={toggleNav}
                    className="text-xl font-medium"
                  >
                    {title}
                  </NavLink>
                ))}
                {auth?.user ? (
                  <button className="text-xl font-medium">
                    {auth?.user?.name}
                  </button>
                ) : (
                  <NavLink to="/login" className="text-xl font-medium">
                    Login{" "}
                  </NavLink>
                )}
                {auth?.user?.role === 1 ? (
                  <>
                    <NavLink
                      to="/admin/dashboard"
                      className="text-xl font-medium"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      className="text-xl font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="text-xl font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
                <button className="text-xl font-medium" onClick={toggleNav}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
