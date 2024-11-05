import express from 'express';
import Joi from 'joi';

const router = express.Router();

const postSchema = Joi.object({
  title: Joi.string()
    .required(),
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
  .post(async (req, res, next) => {
    const validationResult = postSchema.validate(req.body, { abortEarly: false });
    if (validationResult.error) {
      res.statusCode = 422;
      return res.end(validationResult.error);
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

export default router;
