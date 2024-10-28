import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import todosRoutes from "./routes/todos.js";

const mongodb_uri = process.env.MONGODB_URI;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to mongodb
mongoose.connect(mongodb_uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.json("This is the server :3");
});

app.use("/todos", todosRoutes);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
