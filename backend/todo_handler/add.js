const { Todos } = require("../mongodb");

module.exports = async (req, res) => {
  const task = req.body.task;
  const username = req.body.username;

  if (task) {
    const new_item = new Todos({
      username: username,
      task: task,
    });

    const resData = await new_item.save();

    console.log(resData);

    if (resData) {
      res.json({ msg: "Successful", task: resData });
    } else {
      res.json({ error: "Did not saved" });
    }
  } else {
    console.log(task);
    res.json({ error: "Empty Request" });
  }
};
