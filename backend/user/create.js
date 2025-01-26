const { User } = require("../mongodb");

module.exports = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  if (name != "" && username != "" && password != "") {
    try {
      const user = new User({
        username: username,
        name: name,
        password: password,
      });

      const data = await user.save();

      if (data) {
        res.json({ message: "Account created successfully", user: data });
      } else {
        res.json({ error: "Something went wrong." });
      }
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    res.json({ error: "Missing parameters" });
  }
};
