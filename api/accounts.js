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

router.post("/", validateAccount, (req, res) => {
  db("accounts")
    .insert(req.body)
    .returning("id")
    .then((new_ids) => {
      const id = new_ids[0];
      console.log(`account id: ${id}`);
      db("accounts")
        .select()
        .where({ id })
        .first()
        .then((account) => {
          res.status(201).json(account);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Could not retrieve new account" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not insert new account" });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .select()
    .where({ id: req.params.id })
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

router.delete("/:id", (req, res) => {
  db.del()
    .where("id", req.params.id)
    .from("accounts")
    .then((num_deleted) => {
      if (num_deleted > 0) {
        res.status(200).json({ message: "Account deleted" });
      } else {
        res
          .status(404)
          .json({ error: "Account with the specified id could not be found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Could not remove account" });
    });
});

function validateAccount(req, res, next) {
  if (req.body.name === undefined || req.body.budget === undefined) {
    res.status(400).json({ error: "'name' and 'budget' must be specified" });
    return;
  }
  if (typeof req.body.budget !== "number") {
    res.status(400).json({ error: "'budget' must be a number" });
    return;
  }

  next();
}

module.exports = router;
