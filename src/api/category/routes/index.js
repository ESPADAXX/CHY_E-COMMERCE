const router = require("express").Router();
const { create, updateOne, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.get("/",readAll);
// CREATE NEW
router.post("/",create);
// GET ONE
router.get("/:id",readOne);
// UPDATE ONE
router.put("/:id",updateOne);
// DELETE ONE
router.delete("/:id",remove);

module.exports = router;