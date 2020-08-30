const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  list,
  findUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", list);
router.get("/user/:id", findUserById);
router.put("/user/update/:id", updateUser);
router.delete("/user/delete/:id", deleteUser);

module.exports = router;
