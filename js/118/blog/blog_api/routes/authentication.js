import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', (async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hash
    });
    const result = await user.save();

    console.log(result);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return next(new Error(`${req.body.username} is already taken. Please try a different name`));
    }

    return next(err);
  }
}));

router.post('/login', async (req, res, next) => {
  try {
    const results = await User.findOne({username: req.body.username});

    if (!results) {
      throw new Error('Bad username and/or password');
    }
    console.log(results);

    if (!await bcrypt.compare(req.body.password, results.password)) {
      throw new Error('Bad username and/or password');
    }

    req.session.username = req.body.username;
    res.sendStatus(204);
  } catch (err) {
    err.statusCode = 401;
    return next(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(204);
});

export default router;
