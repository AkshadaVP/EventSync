const express = require("express");
const router = express.Router();
const Rsvp = require("../models/RSVP");
const Event = require("../models/event");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ POST: Add RSVP & Send Email
router.post("/add", async (req, res) => {
  const { name, email, phone, eventId } = req.body;

  try {
    // 1. Save RSVP
    const newRsvp = new Rsvp({ name, email, phone, eventId });
    await newRsvp.save();

    // 2. Get Event Details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 3. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Email Content
    const mailOptions = {
      from: `"EventSync" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎟️ Your Ticket for ${event.title}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;border-radius:10px;border:1px solid #ccc;background-color:#f3f4f6;max-width:500px;margin:auto;">
          <h2 style="color:#6b21a8;">🎫 Event Ticket Confirmation</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <hr />
          <p style="font-size:14px;color:#4b5563;">Thank you for registering with <strong>EventSync</strong> 💜</p>
        </div>
      `,
    };

    // 5. Send Email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "RSVP submitted & email sent ✅" });
  } catch (err) {
    console.error("❌ RSVP error:", err);
    res.status(500).json({ message: "Failed to submit RSVP" });
  }
});

// ✅ GET all RSVPs with event info
router.get("/my-rsvps/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    const rsvps = await Rsvp.find({ email: userEmail }).populate("eventId", "title date");
    res.status(200).json(rsvps);
  } catch (err) {
    console.error("❌ Failed to fetch user RSVPs:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
