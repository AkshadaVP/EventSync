const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  time: String,
  location: String,
  image: String, // optional URL to event poster
});

module.exports = mongoose.model("Event", EventSchema);
