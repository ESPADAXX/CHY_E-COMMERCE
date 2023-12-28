const router = require("express").Router();
const isAdmin = require("../../../middlewares/isAdmin");
const { create, update, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.get("/",readAll);
// CREATE NEW
router.post("/",create);
// GET ONE
router.get("/:id",readOne);
// UPDATE ONE
router.put("/:id",update);
// DELETE ONE
router.delete("/:id",remove);

module.exports = router;