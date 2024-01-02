const router = require("express").Router();
const isAdmin = require("../../../middlewares/isAdmin");
const { isModerator } = require("../../../middlewares/isModerator");
const { create, update, readAll, readOne, remove } = require("../controllers");
const {isAuthenticated} = require("../../../middlewares/isAuthenticate");

// GET ALL
router.get("/",isAuthenticated,isModerator,readAll);
// CREATE NEW
router.post("/",isAuthenticated,isAdmin,create);
// GET ONE
router.get("/:id",isAuthenticated,isModerator,readOne);
// UPDATE ONE
router.put("/:id",isAuthenticated,isAdmin,update);
// DELETE ONE
router.delete("/:id",isAuthenticated,isAdmin,remove);

module.exports = router;