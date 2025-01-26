const { Todos } = require("../mongodb");

module.exports = async (req, res) => {

  const username = req.params.username;

  const todos = await Todos.find({username: username});

  console.log(todos);

  res.json({ error: false, message: "success", list: todos });
};
