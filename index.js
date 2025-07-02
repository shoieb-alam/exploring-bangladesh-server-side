const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectToDatabase = require("./db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// === ROUTES ===

// Home Route
app.get("/", (req, res) => {
  res.send("Exploring Bangladesh Backend Running!");
});

// GET All Services
app.get("/services", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const services = await db.collection("users").find({}).toArray();
    res.send(services);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch services");
  }
});

// GET Single Service by ID
app.get("/services/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const service = await db.collection("users").findOne({ _id: ObjectId(req.params.id) });
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch service");
  }
});

// POST New Service
app.post("/services", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("users").insertOne(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add service");
  }
});

// DELETE Service
app.delete("/services/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("users").deleteOne({ _id: ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete service");
  }
});

// POST New Booking
app.post("/bookings", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("bookings").insertOne(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add booking");
  }
});

// GET Bookings by Email
app.get("/myPackages/:email", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("bookings").find({ email: req.params.email }).toArray();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch bookings");
  }
});

// DELETE Booking by Email
app.delete("/myPackages/:email", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("bookings").deleteOne({ email: req.params.email });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete booking");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Exploring Bangladesh server running at http://localhost:${port}`);
});
