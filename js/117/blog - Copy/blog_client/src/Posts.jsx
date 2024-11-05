import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import io from 'socket.io-client';
// import { useLoaderData } from 'react-router-dom';

export default function Posts({setError}) {
  const [posts, setPosts] = useState([]);//useLoaderData);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          const msg = await response.text();
          throw new Error(`${response.status} ${response.statusText} - ${msg}`);
        }
        const posts = await response.json();
        console.log(posts);
        setPosts(posts);
      } catch(err) {
        console.error(err);
        setError(err);
      }
    })();
  }, [setError]);

  const socketIo = io('http://localhost:8080');
  useEffect(() => {
    function processPost(post) {
      const newPosts = [...posts];
      newPosts.push(post);
      setPosts(newPosts);
    }
    socketIo.on('post', processPost);

    function processComment(commentData) {
      const newPosts = [...posts];
      const post = newPosts.find(p => p._id == commentData.postId);
      const newPost = {...post };
      newPost.comments.push(commentData.comment);
      setPosts(newPosts);
    }
    socketIo.on('comment', processComment);

    return () => {
      socketIo.off(processPost);
      socketIo.off(processComment);
    }
  }, [posts, socketIo]);

  return (
    <div>
      {posts.map(post => <Post key={post._id} post={post} setError={setError} />)}
    </div>
  )
}

/*export async function loader() {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`${response.status} ${response.statusText} - ${msg}`);
    }
    const posts = await response.json();
    return posts;
  } catch (err) {
    console.error(err);
    throw err;
  }

  //return fetch('/api/posts');
}*/

Posts.propTypes = {
  setError: PropTypes.func.isRequired
};
