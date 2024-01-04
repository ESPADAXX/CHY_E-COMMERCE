const router = require("express").Router();
const isAuthenticated  = require("../../../middlewares/isAuthenticate");
const { create, update, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.get("/",isAuthenticated,readAll);
// CREATE NEW
router.post("/",isAuthenticated,create);
// GET ONE
router.get("/:id",isAuthenticated,readOne);
// UPDATE ONE
router.put("/:id",isAuthenticated,update);
// DELETE ONE
router.delete("/:id",isAuthenticated,remove);

module.exports = router;