const router = require("express").Router();
const { isModerator } = require("../../../middlewares/isModerator");
const { create, updateOne, readAll, readOne, remove , search, filter } = require("../controllers");
const isAuthenticated = require("../../../middlewares/isAuthenticate");
// // GET ALL
router.get("/",readAll); 
// CREATE NEW
router.post("/",create);
// GET ONE
router.get("/:id", readOne);
// UPDATE ONE
router.put("/:id",isAuthenticated,isModerator,updateOne);
// DELETE ONE
router.delete("/:id",isAuthenticated,isModerator,remove);

// SEARCH BY TITLE
router.get("/search/products/", search);

// filter by category
router.get("/filter/products/", filter);

module.exports = router;