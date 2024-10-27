import express from "express";
import cors from "cors";
import mysql from "mysql";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "todo_app",
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.get("/todos", (req, res) => {
  const q = "select * from tasks";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/todos", (req, res) => {
  const task = req.body.task;
  const q = "insert into tasks (task) values (?)";

  db.query(q, [task], (err, result) => {
    if (err) return res.json(err);
    return res.json("Task added!");
  });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const q = "delete from tasks where id = ?";

  db.query(q, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json("Task deleted!");
  });
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
