import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db("nestaide");

    // Fetch the data from the 'economy' collection
    const collection = db.collection("economy");
    const data = await collection.find({}).toArray();

    // Return the data as JSON using Next.js's new response API
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);

    // Handle the error and return a 500 response
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
