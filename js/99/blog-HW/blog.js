import './css/blog.css';
import setPage from './page';

function createPost(post) {
  const { title, body } = post;

  return `<div class="post">
            <div class="title">${title}</div>
            <div class="body">${body}</div>
          </div>`;
}

export default async function loadBlog(blog) {
  let content;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${blog.id}`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const posts = await response.json();
    content = posts.map(post => createPost(post));
  } catch (e) {
    content = `<div class="error">
        <h4>Unable to load blog<h4>
        <h5>${e.message}</h5>
        </div>`;
  }
  setPage({
    title: blog.name,
    content
  });
}
