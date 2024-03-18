/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Post from "./Post";

export default function Blog({ selectedBlog }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedBlog}`
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        let blogData = await response.json();
        setPosts(blogData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [selectedBlog]);
  return (
    <>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
