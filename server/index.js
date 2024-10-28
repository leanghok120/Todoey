import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("This is the server :3");
});

app.get("/todos", (req, res) => {});

app.post("/todos", (req, res) => {
  const task = req.body.task;
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
