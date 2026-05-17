
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://ponngobeni24_db_user:ponani123@cluster0.b4ipvg3.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("❌ Error:", err);
  }
}

run();