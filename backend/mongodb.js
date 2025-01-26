const mongoose = require("mongoose");
const uri = process.env.DB_URI;
async function connect_db() {
  // console.log(process.env.DB_URI);
  await mongoose.connect(uri);

  mongoose.connection.on("connection", (stream) => {
    console.log("Successfully connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("error: " + err);
  });

  return mongoose;
}

connect_db();

const todosSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide your username"],
  },
  task: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Todos = mongoose.model("Todos", todosSchema);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please create your unique username"],
  },
  name: { type: String, required: [true, "Please enter your name"] },
  password: { type: String, required: [true, "Please create your password"] },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = { mongoose, Todos, User };
