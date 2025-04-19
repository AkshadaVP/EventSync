const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// ✅ GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error("❌ Failed to fetch events:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST a new event
router.post("/add", async (req, res) => {
  const { title, description, date, time, location, image } = req.body;

  try {
    const newEvent = new Event({ title, description, date, time, location, image });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("❌ Failed to create event:", err);
    res.status(500).json({ message: "Failed to create event" });
  }
});

// ✅ DELETE all events (admin use)
router.delete("/", async (req, res) => {
  try {
    await Event.deleteMany({});
    res.status(200).json({ message: "All events deleted successfully" });
  } catch (err) {
    console.error("❌ Failed to delete events:", err);
    res.status(500).json({ message: "Failed to delete events" });
  }
});

// ✅ PUT: Update event by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("❌ Failed to update event:", err);
    res.status(500).json({ message: "Failed to update event" });
  }
});

module.exports = router;
