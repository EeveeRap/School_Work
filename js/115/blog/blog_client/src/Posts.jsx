import { useEffect, useState } from 'react';
import Post from './Post';
import io from 'socket.io-client';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        const posts = await response.json();
        console.log(posts);
        setPosts(posts);
      } catch(err) {
        console.error(err);
      }
    })();
  }, []);

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
      {posts.map(post => <Post key={post._id} post={post}/>)}
    </div>
  )
}
