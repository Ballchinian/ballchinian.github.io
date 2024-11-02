const express = require('express');
const { MongoClient } = require('mongodb');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB configuration
const uri = Netlify.env.get(`ATLAS_URI`);  // Ensure your MongoDB URI is in the .env file
const client = new MongoClient(uri);
let db;

async function connectToDB() {
  try {
    await client.connect();
    db = client.db('myDatabase');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDB();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for form submission
app.post("/submit-dates", async (req, res) => {
  console.log('Received a request:', req.body);
  const { name, selectedDates } = req.body;
  try {
    const collection = db.collection("users");
    const result = await collection.insertOne({ name, selectedDates });
    res.status(201).json(result);
  } catch (e) {
    console.error("Error inserting data:", e);  // Add this for detailed logging
    res.status(500).json({ error: "Failed to save data" });
  }
});



// Netlify function handler
module.exports.handler = serverless(app);
