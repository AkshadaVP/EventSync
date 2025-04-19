import React, { useEffect, useState } from "react";
import axios from "axios";

const RegisteredEvents = () => {
  const [rsvps, setRsvps] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rsvp/my-rsvps/${user?.email}`);
        setRsvps(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch RSVPs", err);
        alert("Failed to load your registrations.");
      }
    };

    if (user?.email) fetchRSVPs();
  }, [user]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-purple-700">
          Registered Event List
        </h2>

        {rsvps.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t registered for any events yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-collapse border-gray-200 rounded-lg table-auto">
              <thead className="text-purple-700 bg-purple-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Event</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp, index) => (
                  <tr key={rsvp._id} className="text-center text-gray-700">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{rsvp.name}</td>
                    <td className="px-4 py-2 border">{rsvp.email}</td>
                    <td className="px-4 py-2 border">{rsvp.phone}</td>
                    <td className="px-4 py-2 border">{rsvp.eventId?.title}</td>
                    <td className="px-4 py-2 border">
                      {new Date(rsvp.eventId?.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
