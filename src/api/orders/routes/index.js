const router = require("express").Router();
const  isAuthenticated  = require("../../../middlewares/isAuthenticate");
const { isModerator } = require("../../../middlewares/isModerator");
const { create, update, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.get("/",readAll);
// CREATE NEW
router.post("/",create);
// GET ONE
router.get("/:id",isAuthenticated,readOne);
// UPDATE ONE
router.put("/:id",isAuthenticated,update);
// DELETE ONE
router.delete("/:id",remove);

module.exports = router;