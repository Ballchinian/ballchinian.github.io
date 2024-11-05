const { MongoClient } = require('mongodb');

const uri = process.env.ATLAS_URI;
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

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const { name, selectedDates } = JSON.parse(event.body);
      if (!db) {
        console.error("Database connection is not established.");
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "Database connection not established" }),
        };
      }

      const collection = db.collection("users");
      const result = await collection.insertOne({ name, selectedDates });

      return {
        statusCode: 201,
        body: JSON.stringify(result),
      };
    } catch (e) {
      console.error("Error inserting data:", e);  // Log the specific error
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to save data" }),
      };
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not Found" }),
    };
  }
};
