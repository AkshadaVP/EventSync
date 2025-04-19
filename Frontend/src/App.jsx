import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import RSVPPage from "./pages/RSVPPage";
import RegisteredEvents from "./pages/RegisteredEvents";

// 👇 Wrapper to use location hook inside Router
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rsvp/:eventId"
                element={
                  <PrivateRoute>
                    <RSVPPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/registered-events"
                element={
                  <PrivateRoute>
                    <RegisteredEvents />
                  </PrivateRoute>
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

// 👇 Main entry with BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
