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
  const eventsSectionRef = useRef(null); // 👈 New ref for scrolling
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to access the dashboard.");
      navigate("/login");
    }

    axios
      .get("http://localhost:5000/api/events")
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
      {/* 🟣 Hero Welcome Section */}
      <section className="w-full bg-gradient-to-b from-purple-50 to-white py-3 px-3 mb-8 rounded-b-[100px]">
        <div className="flex flex-col items-center justify-between max-w-6xl gap-5 mx-auto md:flex-row">
          <div className="flex-1 space-y-5">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full">
              Seamless Event Management
            </span>
            <h1 className="text-6xl font-bold text-gray-900 md:text-6xl">
              Manage Events & RSVPs with Ease
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Welcome <span className="font-semibold text-blue-600">{user?.name}</span>! 🎉 <br />
              Dynographix simplifies event registration and RSVP management with a powerful, intuitive platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={scrollToEvents} // 👈 Scroll instead of navigate
                className="px-6 py-2 text-white transition bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Go to Events
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex-1 hidden md:block">
            <img
              src={EventDashboardImg}
              alt="Event Registration"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* 🎟️ Event Carousel */}
      <div ref={eventsSectionRef} className="relative w-full"> {/* 👈 Ref applied here */}
        <h2 className="mb-8 text-4xl font-bold text-center text-purple-700">
          Upcoming Events
        </h2>

        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute z-10 p-2 text-purple-700 -translate-y-1/2 bg-purple-100 rounded-full shadow-md left-2 top-1/2 hover:bg-purple-200"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className="absolute z-10 p-2 text-purple-700 -translate-y-1/2 bg-purple-100 rounded-full shadow-md right-2 top-1/2 hover:bg-purple-200"
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 px-8 overflow-x-hidden scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {events.map((event) => (
            <div key={event._id} className="flex-shrink-0 w-[320px] h-[460px]">
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
