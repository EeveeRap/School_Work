import "./Header.css";

export default function Header(setSelectedBlog) {
  return (
    <>
      <header>
        <h1>PCS Blogs</h1>
        <nav>
          <ul>
            <li>
              <a href="#" id="homeLink" onClick={() => setSelectedBlog(null)}>
                blog list
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
    </>
  );
}
