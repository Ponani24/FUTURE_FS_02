const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const mockData = require("./MOCK_DATA.json");

app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection (replace with your string)
const uri = "mongodb+srv://ponngobeni24_db_user:ponani123@cluster0.b4ipvg3.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

let db;

// Connect once when server starts
async function connectDB() {
  await client.connect();
  db = client.db("myDatabase"); // 
  console.log("✅ Connected to MongoDB");

  app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
}

connectDB();


app.put("/potential_customers/:id/notes", async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const result = await db.collection("potential_customers").updateOne(
      { _id: new ObjectId(id) },
      {
        $push: { notes: note }
      }
    );

    res.json({ message: "Note added", result });

  } catch (err) {
    res.status(500).json({
      message: "Failed to add note",
      error: err.message
    });
  }
});


app.get("/potential_customers", async (req, res) => {
  try {
    const customers = await db
      .collection("potential_customers")
      .find({})
      .toArray();

    res.json(customers);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: err.message
    });
  }
});

app.put("/potential_customers/:id", async (req, res) => { // changes the status of the customer selected
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.collection("potential_customers").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { status: status }
      }
    );

    res.json({
      message: "Status updated successfully",
      result
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to update status",
      error: err.message
    });
  }
});

app.delete("/potential_customers/:id", async (req, res) => {//  deleting the data of a customer
  try {
    const { id } = req.params;

    const result = await db.collection("potential_customers").deleteOne({
      _id: new ObjectId(id)
    });

    res.json({
      message: "Customer deleted successfully",
      result
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: err.message
    });
  }
});

app.post("/generate-customers", async (req, res) => {
  try {

    // shuffle mock data
    const shuffled = [...mockData].sort(() => 0.5 - Math.random());

    // pick 10
    const selectedCustomers = shuffled.slice(0, 10);

    // insert into MongoDB
    const result = await db
      .collection("potential_customers")
      .insertMany(selectedCustomers);

    res.json({
      message: "Customers generated",
      insertedCount: result.insertedCount,
      customers: selectedCustomers
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error generating customers"
    });
  }
});