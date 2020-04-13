const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select()
    .from("accounts")
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not retrieve accounts data" });
    });
});

router.get("/:id", (req, res) => {
  db.select()
    .from("accounts")
    .where("id", req.params.id)
    .first()
    .then((account) => {
      if (account) {
        res.status(200).json(account);
      } else {
        res
          .status(404)
          .json({ error: "Account with the specified id could not be found" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not retrieve accounts data" });
    });
});

module.exports = router;
