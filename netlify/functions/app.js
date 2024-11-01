const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB setup
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
let db;

// Connect to MongoDB
async function connectToMDB() {
  try {
    await client.connect();
    db = client.db('myDatabase');
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
}

// Invoke the connection to MongoDB when the function is cold-started
connectToMDB();

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    const { name, selectedDates } = JSON.parse(event.body);
    
    try {
      const collection = db.collection('users');
      const result = await collection.insertOne({ name, selectedDates });
      
      return {
        statusCode: 201,
        body: JSON.stringify({ 
          message: `Received dates for ${name}`, 
          dates: selectedDates,
          insertedId: result.insertedId // Optionally return the inserted document ID
        }),
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to add user.' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method not allowed" }),
  };
};
