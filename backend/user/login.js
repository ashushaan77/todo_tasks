const { User } = require("../mongodb");

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const user = await User.findOne({ username: username });

    if (user) {
      //This is just simple ToDo task app so we are not using any password encryption

      if (user.password == password) {
        delete user.password;

        res.json({ message: "Login Successful", user: user });
      } else {
        res.json({ error: "Invalid password entered" });
      }
    } else {
      res.json({ error: "Invalid username or password" });
    }
  } else {
    res.json({ error: "Invalid username or password" });
  }
};
