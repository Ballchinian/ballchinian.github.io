const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');
const serverless = require("serverless-http");

dotenv.config();
const app = express();

// Define your routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Hello from Netlify Function!",
  };
};
// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from the "public" directory (e.g., index.html, script.js)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB setup
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
let db;

async function connectToMDB() {
  try {
    await client.connect();
    db = client.db('myDatabase');
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
}

connectToMDB();

// Route to handle form submission from the client
app.post('/submit-dates', async (req, res) => {
  const { name, selectedDates } = req.body;
  try {
    const collection = db.collection('users');
    const result = await collection.insertOne({ name, selectedDates });
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ error: 'Failed to add user.' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
