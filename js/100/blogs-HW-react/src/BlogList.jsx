/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import BlogInfo from "./BlogInfo";

export default function BlogList({ setSelectedBlog }) {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        setBlogs(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      {blogs?.map((blog) => (
        <BlogInfo key={blog.id} blog={blog} setSelectedBlog={setSelectedBlog} />
      ))}
    </>
  );
}
