const express = require("express");
const router = express.Router();
const { getAllLists } = require("../controllers/listController");
const authorization = require("../middleware/authorization");

router.get("/", authorization, getAllLists);

module.exports = router;
