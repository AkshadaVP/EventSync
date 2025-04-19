const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/event");

dotenv.config(); // Load MONGO_URI from .env

// ✅ List of correct image filenames in your assets/events folder
const correctImageFilenames = [
  "Ai-masterclass.jpg",
  "blockchain.jpg",
  "design-thinking.jpg",
  "digital-marketing.jpg",
  "future-of-ai.jpg",
  "robotics.jpg",
  "startup-expo.jpg",
  "startup-pitch.jpg",
  "web-dev.jpg",
];

// 🛠️ Optional: map them by event title (for more accuracy)
const imageMap = {
  "AI Masterclass": "Ai-masterclass.jpg",
  "Blockchain Basics": "blockchain.jpg",
  "Design Thinking Workshop": "design-thinking.jpg",
  "Digital Marketing 101": "digital-marketing.jpg",
  "Tech Talk: Future of AI": "future-of-ai.jpg",
  "Robotics Demo": "robotics.jpg",
  "Startup Expo": "startup-expo.jpg",
  "Startup Pitch Fest": "startup-pitch.jpg",
  "Web Development Bootcamp": "web-dev.jpg",
};

async function fixImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const events = await Event.find();

    for (let event of events) {
      const correctImage = imageMap[event.title];
      if (correctImage && event.image !== correctImage) {
        event.image = correctImage;
        await event.save();
        console.log(`🔁 Updated ${event.title} → ${correctImage}`);
      }
    }

    console.log("✅ All event images updated.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

fixImages();
