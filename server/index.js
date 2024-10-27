import express from "express";
import mysql from "mysql";
import "dotenv/config";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "todo_app",
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello, this is the server :3");
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
