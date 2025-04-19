import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Update user/token on path change
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
    <nav className="flex items-center justify-between p-4 px-6 shadow-md bg-purple-50">
      {/* 🔁 Smart logo click (go to dashboard if logged in, else login) */}
      <span
        onClick={() => navigate(token && user ? "/dashboard" : "/login")}
        className="text-2xl font-bold text-purple-700 cursor-pointer"
      >
        EventSync
      </span>

      <div className="space-x-6 text-lg">
        {token ? (
          <>
            <span className="font-medium text-purple-700">
              Hi, {user?.name?.split(" ")[0]}
            </span>
            <Link to="/dashboard" className="font-medium text-purple-700 hover:underline">
              Dashboard
            </Link>
            <Link to="/registered-events" className="font-medium text-purple-700 hover:underline">
              Registered Events
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-purple-700 transition bg-purple-100 rounded-md hover:bg-purple-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="font-semibold text-purple-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="font-semibold text-purple-600 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
