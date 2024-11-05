const { MongoClient } = require('mongodb');

// Get the MongoDB URI from environment variables
const uri = process.env.ATLAS_URI;

let client;
let db;

// Function to connect to MongoDB
async function connectToDB() {
  if (db) return db; // Return if already connected

  if (!uri) {
    console.error('MongoDB URI not found in environment variables.');
    throw new Error('MongoDB URI not found.');
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('myDatabase');  
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const { name, selectedDates } = JSON.parse(event.body);

      // Connect to MongoDB (ensures the connection is ready before proceeding)
      const database = await connectToDB();
      const collection = database.collection("users");

      const result = await collection.insertOne({ name, selectedDates });

      return {
        statusCode: 201,
        body: JSON.stringify(result),
      };
    } catch (e) {
      console.error("Error inserting data:", e);  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message || "Failed to save data" }),
      };
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not Found" }),
    };
  }
};
