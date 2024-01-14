import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
        <ul>
            <li><Link to="/Home">Home</Link></li> |
            <li><Link to="/AboutUs">About Us</Link> </li>
            <li><Link to="/BuyHome">Buy A Home</Link> </li>
            <li><Link to="/SellHome">Sell A Home</Link> </li>
        </ul>
    </nav>
  )
}
