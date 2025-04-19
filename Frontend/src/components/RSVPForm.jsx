// src/components/RSVPForm.jsx
import React, { useState } from "react";
import axios from "axios";

const RSVPForm = ({ eventId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.name.trim())) {
      newErrors.name = "Name must be ≥2 letters and contain only letters/spaces.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10‑digit phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("https://eventsync-0bu4.onrender.com/api/rsvp/add", {
        ...formData,
        eventId
      });
      alert("🎉 RSVP submitted!");
      setFormData({ name: "", email: "", phone: "" });
      setErrors({});
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ RSVP failed:", err);
      alert("Failed to submit RSVP.");
    }
  };

  const baseInputClasses =
    "w-full p-2 mb-3 bg-gray-100 rounded-lg font-semibold transition-shadow duration-200 ease-in-out " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-md"
    >
      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className={`${baseInputClasses} ${errors.name ? "border border-red-500" : ""}`}
      />
      {errors.name && (
        <p className="mb-3 text-sm text-red-500">{errors.name}</p>
      )}

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={`${baseInputClasses} ${errors.email ? "border border-red-500" : ""}`}
      />
      {errors.email && (
        <p className="mb-3 text-sm text-red-500">{errors.email}</p>
      )}

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone (10 digits)"
        value={formData.phone}
        onChange={handleChange}
        className={`${baseInputClasses} ${errors.phone ? "border border-red-500" : ""}`}
      />
      {errors.phone && (
        <p className="mb-3 text-sm text-red-500">{errors.phone}</p>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 mt-2 text-white transition-colors bg-purple-600 rounded hover:bg-purple-700"
      >
        Submit RSVP
      </button>
    </form>
  );
};

export default RSVPForm;
