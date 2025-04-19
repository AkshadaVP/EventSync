import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventDashboardImg from "../assets/event-registration.png";
import PageWrapper from "./PageWrapper";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const eventsSectionRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to access the dashboard.");
      navigate("/login");
    }

    axios
      .get("https://eventsync-0bu4.onrender.com/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("Error fetching events:", err);
        alert("Failed to load events.");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
  };

  const scrollToEvents = () => {
    eventsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageWrapper>
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-purple-50 to-white py-6 px-4 sm:px-6 md:px-8 mb-8 rounded-b-[100px]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Text */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <span className="inline-block text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Seamless Event Management
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                Register and manage your event RSVPs with ease.
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Welcome <span className="text-blue-600 font-semibold">{user?.name}</span>! 🎉 <br />
                Easily register for events, manage RSVPs, and view your registered events—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={scrollToEvents}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md transition"
                >
                  Go to Events
                </button>
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 mt-6 md:mt-0">
              <img
                src={EventDashboardImg}
                alt="Event Registration"
                className="w-full max-w-md mx-auto md:mx-0"
              />
            </div>
          </div>
        </section>

        {/* Event Carousel */}
        <div ref={eventsSectionRef} className="relative w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 text-center mb-6">
            Upcoming Events
          </h2>

          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-purple-100 text-purple-700 p-2 sm:p-3 rounded-full shadow-md hover:bg-purple-200 z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-100 text-purple-700 p-2 sm:p-3 rounded-full shadow-md hover:bg-purple-200 z-10"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-hidden px-4 sm:px-8 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {events.map((event) => (
              <div key={event._id} className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] h-[460px]">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
