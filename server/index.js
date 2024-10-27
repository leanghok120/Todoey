import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json("Hello, this is the server :3");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
