const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select()
    .from("accounts")
    .then((accounts) => {
      res.status(200).json(accounts);
    });
});

module.exports = router;
