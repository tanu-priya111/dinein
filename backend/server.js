const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Booking = require("./models/Booking");
const Restaurant = require("./models/Restaurant");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const isAdmin = async (req, res, next) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser || adminUser.admin !== 1) {
      return res.status(403).json({ message: "Access denied! Admins only." });
    }

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Signup Route
app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new User({ email, password, username });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.username,
        email: newUser.email,
        admin: newUser.admin
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.username,
        email: user.email,
        admin: user.admin
      }
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add Restaurant (Admin only)
app.post("/addRestaurant", isAdmin, async (req, res) => {
  try {
    const { name, location, tables } = req.body;

    if (!name || !location || !tables) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newRestaurant = new Restaurant({ name, location, tables });
    await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: newRestaurant
    });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get All Restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Restaurant
app.delete("/deleteRestaurant/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24) {
    return res.status(400).json({ error: "Invalid restaurant ID" });
  }

  try {
    const result = await Restaurant.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Confirm Booking
app.post("/confirmBooking", async (req, res) => {
  const { name, date, time, people, contact, tableNumber, restaurant } = req.body;

  if (!name || !date || !time || !people || !contact || !tableNumber || !restaurant) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const newBooking = new Booking({
      name,
      date,
      time,
      people,
      contact,
      tableNumber,
      restaurant
    });
    await newBooking.save();

    res.status(201).json({ message: "Booking Confirmed!", booking: newBooking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
