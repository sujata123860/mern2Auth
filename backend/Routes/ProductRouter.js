const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../Middlewares/Auth");

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    { name: "mobile", price: "10000" },
    { name: "TV", price: "20000" },
  ]);
});

module.exports = router;
