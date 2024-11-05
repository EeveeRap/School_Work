import express from 'express';
import Joi from 'joi';
import authenticatedUserOnly from '../authenticatedUserOnly.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

const postSchema = Joi.object({
  title: Joi.string()
    .required(),
  body: Joi.string()
    .required()
});

const commentSchema = Joi.object({
  body: Joi.string()
    .required()
});

router.use(async (req, res, next) => {
  req.posts = await req.database.collection('posts');
  next();
});

router.route('/')
  .get(async function (req, res, next) {
    try {
      const thePosts = await req.posts.find().toArray();
      res.send(thePosts);
    } catch (err) {
      next(err);
    }
  })
  .post(authenticatedUserOnly, async (req, res, next) => {
    const validationResult = postSchema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      const err = new Error(validationResult.error.message);
      err.status = 422;
      next(err);
    }

    req.body.author = req.session.username;
    req.body.date = new Date();
    try {
      const result = await req.posts.insertOne(req.body);

      if (!result.insertedId) {
        return next(new Error('oops, failed to add post?'));
      }

      req.socketIo.emit('post', req.body);

      res.status(201)
        //.location()
        .send(req.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.post('/:id/comments', authenticatedUserOnly, async (req, res, next) => {
  const validationResult = commentSchema.validate(req.body, { abortEarly: false });
  if (validationResult.error) {
    const err = new Error(validationResult.error.message);
    err.status = 422;
    next(err);
  }

  req.body.author = req.session.username;
  req.body.date = new Date();
  try {
    const result = await req.posts.updateOne(
      {_id: new ObjectId(req.params.id)},
      {$push: {comments: req.body}});

    console.log(result);

    if (!result.matchedCount) {
      const err = new Error(`Unable to find post ${req.params.id}`);
      err.statusCode = 404;
      return next(err);
    }

    req.socketIo.emit('comment', {postId: req.params.id, comment: req.body});

    res.status(201)
      //.location()
      .send(req.body);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
