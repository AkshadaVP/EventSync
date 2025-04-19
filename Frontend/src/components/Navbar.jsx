import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-purple-50 shadow-md p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
      {/* ✅ Smart Logo Click */}
      <span
        onClick={() => navigate(token && user ? "/dashboard" : "/login")}
        className="text-2xl font-bold text-purple-700 cursor-pointer"
      >
        EventSync
      </span>

      {/* ✅ Responsive navigation links */}
      <div className="flex flex-col sm:flex-row items-center text-sm sm:text-base sm:space-x-6 space-y-1 sm:space-y-0 text-center">
        {token ? (
          <>
            <span className="text-purple-700 font-medium">
              Hi, {user?.name?.split(" ")[0]}
            </span>
            <Link to="/dashboard" className="text-purple-700 hover:underline">
              Dashboard
            </Link>
            <Link to="/registered-events" className="text-purple-700 hover:underline">
              Registered Events
            </Link>
            <button
              onClick={handleLogout}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200 mt-1 sm:mt-0"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
