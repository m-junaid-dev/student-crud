const express = require("express");
const router = express.Router();
const c = require("../controllers/studentController");

router.route("/").post(c.createStudent).get(c.getStudents);
router.route("/:id").get(c.getStudent).put(c.updateStudent).delete(c.deleteStudent);

module.exports = router;
