function router(socketIo) {
  const express = require('express');
  const debug = require('debug')('contacts-api:contacts-api');
  const pool = require('../connectionPool.js');
  const Joi = require('joi');

  const router = express.Router();

  const contactSchema = Joi.object({
    first: Joi.string()
      .alphanum()
      .min(3)
      .max(7)
      .required(),

    last: Joi.string()
      .required(),

    email: Joi.string().allow(''),
    phone: Joi.number()
  });

  router.route('/')
    .get(async (req, res, next) => {
      debug('Getting all contacts');

      try {
        const [results] = await pool.query(
          'SELECT * FROM contacts'
        );
        res.send(results);
      } catch (err) {
        return next(err);
      }
    })
    .post(async (req, res, next) => {
      debug(`adding contact ${JSON.stringify(req.body)}`);

      const validationResult = contactSchema.validate(req.body, { abortEarly: false });
      console.dir(validationResult);
      if (validationResult.error) {
        const err = new Error(validationResult.error.message);
        err.status = 422;
        next(err);
      }

      const { first, last, email, phone } = req.body;

      /*if (!first || first.length < 3 || first.length > 7) {
        //const error = { prop: 'first', msg: 'First is required and must be between 3 and 7 characters'};
        //const err = new Error(JSON.stringify(error));

        const err = new Error('First is required and must be between 3 and 7 characters');
        err.status = 422;
        next(err);
      }*/

      try {
        const [results] = await pool.execute(
          'INSERT INTO contacts(first, last, email, phone) VALUES(?,?,?,?)', [first, last, email, phone]
        );

        console.log(results);
        req.body.id = results.insertId;

        socketIo.emit('add', req.body);

        res.status(201)
          .location(`/contacts-api/${req.body.id}`)
          .send(req.body);
      } catch (err) {
        return next(err);
      }
    });

  router.route('/:id')
    .get(async (req, res, next) => {
      debug(`Getting contact ${req.params.id}`);

      try {
        const [results] = await pool.query(
          'SELECT * FROM contacts WHERE id = ?', [req.params.id]
        );

        if (!results.length) {
          return res.status(404)
            .send(`Unable to find contact ${req.params.id}`);
        }

        res.send(results[0]);
      } catch (err) {
        return next(err);
      }
    })
    .put(async (req, res, next) => {
      debug(`Updating contact ${req.params.id}`);

      const validationResult = contactSchema.validate(req.body, { abortEarly: false });
      console.dir(validationResult);
      if (validationResult.error) {
        const err = new Error(validationResult.error.message);
        err.status = 422;
        next(err);
      }

      const { first, last, email, phone } = req.body;

      try {
        const [results] = await pool.query(
          `UPDATE contacts
          SET first = ?, last = ?, email = ?, phone = ?
          WHERE id = ?`, [first, last, email, phone, req.params.id]
        );

        console.log(results);
        if (!results.affectedRows) {
          return res.status(404)
            .end(`Unable to find contact ${req.params.id}`);
        }

        req.body.id = +req.params.id;
        socketIo.emit('update', req.body);

        res.sendStatus(204);
      } catch (err) {
        return next(err);
      }
    })
    .delete(async (req, res, next) => {
      debug(`Deleting contact ${req.params.id}`);

      try {
        const [results] = await pool.query(
          'DELETE FROM contacts WHERE id = ?', [req.params.id]
        );

        console.log(results);
        if (!results.affectedRows) {
          return res.status(404)
            .end(`Unable to find contact ${req.params.id}`);
        }

        socketIo.emit('delete', +req.params.id);

        res.sendStatus(204);
      } catch (err) {
        return next(err);
      }
    });

  router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.end(err.message || 'Internal server error...');
  });

  return router;
}

module.exports = router;
