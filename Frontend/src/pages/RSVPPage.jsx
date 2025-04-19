import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RSVPForm from "../components/RSVPForm";

const RSVPPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`https://eventsync-0bu4.onrender.com/api/events`)
      .then((res) => {
        const found = res.data.find((e) => e._id === eventId);
        setEvent(found);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
      });
  }, [eventId]);

  if (!event) return <p className="mt-10 text-center">Loading event...</p>;

  // Load local image
  let imageSrc = "https://via.placeholder.com/400x200?text=Event";
  try {
    if (event.image) {
      imageSrc = new URL(`../assets/events/${event.image}`, import.meta.url).href;
    }
  } catch (e) {
    console.warn("⚠️ Could not load local image.");
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* Image */}
          <div>
            <img
              src={imageSrc}
              alt={event.title}
              className="object-cover w-full h-64 rounded-lg shadow-md md:h-80"
            />
          </div>

          {/* Description */}
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
              Event Details
            </span>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">{event.title}</h1>
            <p className="mb-4 text-gray-700 whitespace-pre-line">
              {event.description}
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>📍 <strong>Location:</strong> {event.location}</li>
              <li>📅 <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</li>
              <li>⏰ <strong>Time:</strong> {event.time}</li>
            </ul>
          </div>
        </div>

        {/* RSVP Form */}
        <div className="mt-12">
          <h2 className="p-2 mb-4 text-2xl font-semibold text-center text-white bg-purple-600 rounded-2xl">Register for this event</h2>
          <div className="p-6 bg-white shadow-md rounded-xl">
            <RSVPForm eventId={eventId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPPage;
