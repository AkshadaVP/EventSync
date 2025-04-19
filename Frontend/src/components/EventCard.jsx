import React from "react";
import { useNavigate } from "react-router-dom";
import ClockIcon from "../assets/ClockImg.png";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  if (!event) return <div className="bg-purple-50 rounded-lg p-6 shadow">Loading...</div>;

  let imageSrc = "https://via.placeholder.com/400x200?text=Event";
  try {
    if (event.image) {
      imageSrc = new URL(`../assets/events/${event.image}`, import.meta.url).href;
    }
  } catch (error) {
    console.warn("⚠️ Could not load local image.");
  }

  return (
    <div className="w-full max-w-sm bg-purple-50 rounded-xl shadow-lg overflow-hidden p-4 flex flex-col justify-between h-full">
      {/* Image */}
      <div className="w-full h-48 bg-purple-100 rounded-lg overflow-hidden mb-4">
        <img
          src={imageSrc}
          alt={`Event - ${event.title}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-800">{event.title}</h2>
          <div className="flex items-center bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-md">
            <img src={ClockIcon} alt="Time" className="w-4 h-4 mr-1" />
            {event.time}
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-3">{event.description}</p>

        <h3 className="text-purple-700 text-sm font-semibold">📍 {event.location}</h3>
        <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>

        <button
          className="mt-3 bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
          onClick={() => navigate(`/rsvp/${event._id}`)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default EventCard;
