const express = require("express");
const add = require("./add");
const delete_task = require("./delete_task");
const list = require("./list");
const update = require("./update");

const router = express.Router();

router.get("/list/:username", list);
router.post("/add", add);
router.post("/delete", delete_task);
router.post("/update", update);

module.exports = router;
