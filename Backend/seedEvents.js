module.exports = [{"title": "Startup Expo", "description": "Startup Expo is a showcase of emerging startups, entrepreneurs, and innovative projects. Attendees will explore booths, live product demos, and networking opportunities with venture capitalists and business incubators. A must-attend for those interested in business innovation and technology startups.", "date": "2025-04-25T00:00:00.000Z", "time": "10:00 AM", "location": "MIT Auditorium", "image": "startup-expo.jpg"}, {"title": "AI Masterclass", "description": "This masterclass covers cutting-edge Artificial Intelligence tools and their real-world applications. Learn about machine learning, neural networks, and prompt engineering using tools like Python, TensorFlow, and ChatGPT APIs. Ideal for students and professionals looking to upskill.", "date": "2025-04-30T00:00:00.000Z", "time": "11:00 AM", "location": "Block C, Lab 5", "image": "Ai-masterclass.jpg"}, {"title": "Tech Talk: Future of AI", "description": "A panel discussion featuring industry leaders, researchers, and policy makers on where AI is headed. Topics include generative AI, ethics in AI, job automation, and AI in education and healthcare. Includes Q&A and audience participation.", "date": "2025-05-01T00:00:00.000Z", "time": "2:00 PM", "location": "Seminar Hall A", "image": "future-of-ai.jpg"}, {"title": "Startup Pitch Fest", "description": "Startup Pitch Fest gives aspiring entrepreneurs a platform to pitch their business ideas to angel investors and venture capitalists. Includes mentorship rounds, startup exhibition booths, and a chance to win seed funding.", "date": "2025-05-05T00:00:00.000Z", "time": "4:00 PM", "location": "Main Auditorium", "image": "startup-pitch.jpg"}, {"title": "Web Dev Bootcamp", "description": "A full-day hands-on bootcamp covering the essentials of web development. Learn HTML, CSS, JavaScript, React, and backend with Node.js. Best suited for beginners and intermediate developers. Bring your laptop!", "date": "2025-05-10T00:00:00.000Z", "time": "10:30 AM", "location": "Lab 7", "image": "web-dev.jpg"}, {"title": "Digital Marketing 101", "description": "This workshop is designed to introduce digital marketing fundamentals including SEO, content strategy, Google Ads, email campaigns, and social media branding. Perfect for entrepreneurs, freelancers, and marketers.", "date": "2025-05-15T00:00:00.000Z", "time": "12:00 PM", "location": "Room 102", "image": "digital-marketing.jpg"}, {"title": "Robotics Expo", "description": "A live demonstration of state-of-the-art robots and autonomous systems. Interact with humanoid bots, drones, and AI-powered automation tools. Explore career paths and workshops in the robotics field.", "date": "2025-05-20T00:00:00.000Z", "time": "1:00 PM", "location": "Tech Park Exhibition Hall", "image": "robotics.jpg"}, {"title": "Design Thinking Workshop", "description": "Participate in a collaborative workshop focused on innovation through design thinking. Learn to identify real problems, brainstorm solutions, and prototype ideas. This workshop is highly interactive and team-based.", "date": "2025-05-22T00:00:00.000Z", "time": "3:00 PM", "location": "Innovation Hub", "image": "design-thinking.jpg"}, {"title": "Blockchain 101", "description": "Discover the foundations of blockchain technology including how cryptocurrencies work, decentralized applications (DApps), smart contracts, and NFTs. This beginner-friendly session includes live demonstrations and case studies.", "date": "2025-05-25T00:00:00.000Z", "time": "11:00 AM", "location": "Virtual Zoom Link", "image": "blockchain.jpg"}]

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/event");

dotenv.config();

const events = module.exports;

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Event.deleteMany(); // clear existing data
    await Event.insertMany(events);
    console.log("✅ Events seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Failed to seed events:", err);
  }
}

seedDatabase();
