import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";

function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling downwards
        setVisible(false);
      } else {
        // Scrolling upwards
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-4 left-0 right-0 mx-auto z-50 w-[94%] max-w-7xl transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${visible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0 pointer-events-none"
        }`}
    >
      <div className="bg-[#213448]/95 backdrop-blur-md shadow-xl rounded-full border border-white/10 overflow-hidden">
        {/* Inner padding container */}
        <div className="px-6 md:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* LEFT: Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-xl md:text-2xl font-bold !text-white tracking-wide hover:opacity-90 transition">
                  Gangs Sengy Guest House
                </h1>
              </Link>
            </div>

            {/* CENTER: Desktop Nav Links */}
            <nav className="hidden lg:flex flex-1 justify-center items-center space-x-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === item.path
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {token && (
                <Link
                  to="/payments/my"
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === "/payments/my"
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {user?.role === "admin" ? "All Payments" : "Payment"}
                </Link>
              )}

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={`ml-4 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${location.pathname === "/admin"
                    ? "text-accent bg-accent/10"
                    : "text-accent hover:text-white hover:bg-accent/10"
                    }`}
                >
                  Admin
                </Link>
              )}
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Buttons - hidden on <md */}
              <div className="hidden md:flex items-center gap-3">
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-red-200 bg-red-500/20 rounded-full hover:bg-red-500/30 hover:text-white transition-all duration-300 border border-red-500/20"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white hover:text-accent transition-all duration-300 hover:bg-white/5 rounded-full"
                  >
                    Login
                  </Link>
                )}

                <Link to={token ? "/rooms" : "/login"}>
                  <button className="bg-accent text-primary px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300 active:scale-95">
                    Book Now
                  </button>
                </Link>
              </div>

              {/* Mobile Toggle - ONLY visible on <md */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-3 text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#213448] z-40 transform transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full invisible"
          } flex flex-col justify-center items-center space-y-8 backdrop-blur-xl`}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="text-2xl font-medium text-white hover:text-accent transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {token && (
            <Link
              to="/payments/my"
              onClick={() => setOpen(false)}
              className="text-2xl font-medium text-white hover:text-accent transition-colors"
            >
              {user?.role === "admin" ? "All Payments" : "Payment"}
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="text-2xl font-bold text-accent hover:text-white transition-colors"
            >
              Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="w-12 h-0.5 bg-white/10 rounded-full"></div>
        <div className="flex flex-col items-center gap-6">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-red-200 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition text-lg"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-xl font-bold text-white"
            >
              Login
            </Link>
          )}
          <Link to={token ? "/rooms" : "/login"} onClick={() => setOpen(false)}>
            <button className="bg-white text-slate-900 px-8 py-3 rounded-xl text-lg font-bold shadow-lg active:scale-95 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;