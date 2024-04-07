// instead of nodemon, you can also use node --watch server.js
// as this is a simple project so we will not use mongoose and directly use mongodb packages from website

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "PassOp";

client.connect();
const db = client.db(dbName);
const collection = db.collection("passwords");

//View Passwords
app.get("/", async (req, res) => {
  const findUsers = await collection.find({}).toArray();
  res.send(findUsers);
});

//Save passwords
app.post("/", async (req, res) => {
  const userInfo = req.body;
  const insertUser = await collection.insertOne(userInfo);
  res.send({ result: insertUser });
});

//Delete passwords
app.delete("/", async (req, res) => {
  const userInfo = req.body;
  const deleteUser = await collection.deleteOne(userInfo);
  res.send({ result: deleteUser });
});

app.listen(9999, () => {
  console.log("Server started");
});
