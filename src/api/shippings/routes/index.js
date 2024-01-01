const router = require("express").Router();
const isAdmin = require("../../../middlewares/isAdmin");
const { create, updateOne, readAll, readOne, remove } = require("../controllers");

// GET ALL
router.get("/",isAuthenticated,isAdmin,readAll); 
// CREATE NEW
router.post("/",isAuthenticated,isAdmin,create);
// GET ONE
router.get("/:id",isAuthenticated,isAdmin,readOne);
// UPDATE ONE
router.put("/:id",isAuthenticated,isAdmin,updateOne);
// DELETE ONE
router.delete("/:id",isAuthenticated,isAdmin,remove);

module.exports = router;