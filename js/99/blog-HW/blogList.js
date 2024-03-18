import loadBlog from './blog';
import './css/blogList.css';
import setPage from './page';
import $ from 'jquery';

function createBlogInfo(blog) {
  const {name, website, company: {name: companyName, catchPhrase} } = blog;

  return $(`<div class="blog">
            <div class="title">${name}</div>
            <div class="website">${website}</div>
            <div class="company">
              <div>${companyName}</div>
              <div>${catchPhrase}</div>
            </div>
          </div>`).on('click', () => {
            loadBlog(blog);
          });
}

export default async function getBlogList() {
  let content;
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (! response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const blogs = await response.json();
    content = blogs.map(blog => createBlogInfo(blog));
  } catch(e) {
    content = `<div class="error">
        <h4>Unable to load blog list<h4>
        <h5>${e.message}</h5>
        </div>`;
  }
  setPage({
    title: 'Blog List',
    content
  });
}