import express from 'express';
import authenticatedUserOnly from '../authenticatedUserOnly.js';
import Post from '../models/post.js';
import post from '../models/post.js';

// import { ObjectId } from 'mongodb';

const router = express.Router();

router.route('/')
  .get(async function (req, res, next) {
    try {
      const thePosts = await Post.find();
      res.send(thePosts);
    } catch (err) {
      next(err);
    }
  })
  .post(authenticatedUserOnly, async (req, res, next) => {
    try {
      const post = new Post({
        title: req.body.title,
        author: req.session.username,
        body: req.body.body
      });
      await post.save();

      req.socketIo.emit('post', post);

      res.status(201)
        //.location()
        .send(req.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.post('/:id/comments', authenticatedUserOnly, async (req, res, next) => {
  const comment = {
    author: req.session.username,
    body: req.body.body
  };

  try {
    /*const result = await Post.findByIdAndUpdate({ _id: req.params.id },
      { $push: { comments: comment } });*/

    const post = await Post.findById(req.params.id);

    // console.log(result);

    if (!post) {
      const err = new Error(`Unable to find post ${req.params.id}`);
      err.statusCode = 404;
      return next(err);
    }

    post.comments = post.comments || [];
    post.comments.push(comment);
    await post.save();


    req.socketIo.emit('comment', { postId: req.params.id, comment });

    res.status(201)
      //.location()
      .send(req.body);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
