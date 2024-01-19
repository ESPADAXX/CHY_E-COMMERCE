const router = require("express").Router();
const isAdmin = require("../../../middlewares/isAdmin");
const isAuthenticated = require("../../../middlewares/isAuthenticate");
const { isModerator } = require("../../../middlewares/isModerator");
const { create, updateOne, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.get("/",readAll);
// CREATE NEW
router.post("/",isAuthenticated,isAdmin,create);
// GET ONE
router.get("/:id",isAuthenticated,readOne);
// UPDATE ONE
router.put("/:id",isAuthenticated,updateOne);
// DELETE ONE
router.delete("/:id", isAuthenticated, isAdmin, remove);


module.exports = router;