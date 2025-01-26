const express = require("express");

const app = express();

//dotenv package should be imported before all route and configuration to get it accessed from everywhere.
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todo = require("./todo_handler/route");
const userRouter = require("./user/route");


app.get("/", (req, res) => {
  console.log(process.env.DB_URI);
  res.send("hello world");
});

app.use("/todo", todo);

//User route for authenction and user sign up
app.use("/user", userRouter);

//To do route
app.use("*", (req, res) => {
  res.status(404).json({error: "Not Found"});
});

app.listen("2500", () => {
  console.log("Server is running on localhost:2500");
});
