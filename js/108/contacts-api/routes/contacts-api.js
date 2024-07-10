var express = require("express");
var router = express.Router();

/* GET home page. */
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const [results] = await global.connection.query("SELECT * FROM contacts");
      res.send(results);
    } catch (err) {
      return next(err);
    }
  })

  .post(async (req, res, next) => {
    const { first, last, email, phone } = req.body;
    try {
      const [results] = await global.connection.execute(
        "INSERT INTO contacts(first, last, email, phone) VALUES(?,?,?,?)",
        [first, last, email, phone]
      );

      console.log(results);
      req.body.id = results.insertId;
      res.status(201).location(`/contacts-api/${req.body.id}`).send(req.body);
    } catch (err) {
      return next(err);
    }
  });

router.delete("/:id", async (req, res, next) => {
  try {
    const [results] = await global.connection.query(
      "DELETE FROM contacts WHERE id = ?",
      [req.params.id]
    );
    if (!results.affectedRows) {
      return res.status(404).end(`Couldn't Find Contact ${req.body.params}`);
    }
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [results] = await global.connection.query(
      "SELECT * FROM contacts WHERE id = ?",
      [req.params.id]
    );

    if (!results.length) {
      return res.status(404).end(`Unable to find contact ${req.params.id}`);
    }
    res.send(results);
    res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { first, last, email, phone } = req.body;
  try {
    const [results] = await global.connection.query(
      `UPDATE contacts
       SET first = ?, last = ?, email = ?, phone = ?
       WHERE id = ?`,
      [first, last, email, phone, req.params.id]
    );

    if (!results.affectedRows) {
      return res.status(404).end(`Unable to update contact ${req.params.id}`);
    }
    res.send(results);
    res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.end(err.message || "internal server error");
});

module.exports = router;
