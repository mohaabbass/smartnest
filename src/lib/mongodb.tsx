import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, we use a global variable to maintain the MongoDB connection across hot reloads.
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, create a new client for each request.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
