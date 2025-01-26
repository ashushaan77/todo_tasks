const { Mongoose } = require("mongoose");
const { Todos } = require("../mongodb");

module.exports = async (req, res) => {
  const task_id = req.body.id;
  const username = req.body.username;

  try {
    const data = await Todos.deleteOne({ _id: task_id, username: username });

    if (data && data.deletedCount > 0) {
      res.json({ message: "Successful Deleted", data: data });
    } else {
      console.log(err);
      res.json({ error: "No record match" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};
