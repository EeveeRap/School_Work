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
        const response = await fetch('http://localhost:8080/postss');
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

    return () => {
      socketIo.off(processPost);
    }
  }, [posts, socketIo]);

  return (
    <div>
      {posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  )
}

/*export async function loader() {
  try {
    const response = await fetch('http://localhost:8080/posts');
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

  //return fetch('http://localhost:8080/posts');
}*/

Posts.propTypes = {
  setError: PropTypes.func.isRequired
};
