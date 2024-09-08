import { MongoClient } from "mongodb";

// MongoDB connection URI from environment or fallback to localhost MongoDB
const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017";

// MongoDB connection options (leave it empty if not using additional options)
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend the NodeJS.Global interface to include _mongoClientPromise for TypeScript typing
declare global {
  // Extending the NodeJS Global interface to include _mongoClientPromise
  var _mongoClientPromise: Promise<MongoClient>;
}

// Throw an error if MongoDB URI is not provided in environment variables
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Check if we are in development mode
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to maintain a single connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new connection for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export the clientPromise to be used in the app
export default clientPromise;
