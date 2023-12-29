const router = require("express").Router();
const { create, updateOne, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.route("/").get(readAll); 
// CREATE NEW
router.route("/").post(create);
// GET ONE
router.route("/:id").get(readOne);
// UPDATE ONE
router.route("/:id").put(updateOne);
// DELETE ONE
router.route("/:id").delete(remove);

module.exports = router;