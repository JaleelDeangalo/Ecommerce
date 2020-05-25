const express = require("express");
const router = express.Router();
const signout = require("../controllers/auth");
const signin = require("../controllers/auth");
const signup = require("../controllers/auth");

router.post("/signup",signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
