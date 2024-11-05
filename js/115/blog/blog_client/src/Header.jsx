import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header>
      <h1>PCS Node, Express, MongoDB, Socket.IO, React Blog</h1>

      <nav>
        <NavLink to="/">home</NavLink> | <NavLink to="/addPost">add post</NavLink>
      </nav>
    </header>
  )
}
