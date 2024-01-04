const router = require("express").Router();
const  isAuthenticated  = require("../../../middlewares/isAuthenticate");
const { isModerator } = require("../../../middlewares/isModerator");
const { create, updateOne, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.get("/",readAll);
// CREATE NEW
router.post("/",isAuthenticated,isModerator,create);
// GET ONE
router.get("/:id",isAuthenticated,isModerator,readOne);
// UPDATE ONE
router.put("/:id",isAuthenticated,isModerator,updateOne);
// DELETE ONE
router.delete("/:id",isAuthenticated,isModerator,remove);

module.exports = router;