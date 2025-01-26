const { Todos } = require("../mongodb");

module.exports = async (req, res) => {
  const task_id = req.body.id;
  const status = req.body.status;

  try {
    const data = await Todos.updateOne({ _id: task_id }, { status: status });

    if (data && data.modifiedCount > 0) {
      res.json({ message: "Successful updated", data: data });
    } else {
      console.log(err);
      res.json({ error: "No record match" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};
