const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));         // 🔐 Auth routes
app.use("/api/events", require("./routes/events"));     // 📅 Event routes
app.use("/api/rsvp", require("./routes/rsvp"));         // 📝 RSVP routes ✅ NEW

// ✅ Connect MongoDB & Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
