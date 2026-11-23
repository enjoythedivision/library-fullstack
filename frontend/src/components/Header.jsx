import "./Header.css";
import { Link, NavLink } from "react-router-dom";

export default function Header({ user, isAdmin }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        Library
      </Link>
      <nav>
        <ul>
          {user ? (
            <>
              {isAdmin && (
                <li><Link className="button button-primary" to="/addbook">Add book</Link></li>
              )}
              <li><NavLink className="nav-link" to="/favorites">Wishlist</NavLink></li>
              <li><NavLink className="nav-link nav-account" to="/logout">Log out</NavLink></li>
            </>
          ) : (
            <li><Link className="button button-secondary" to="/login">Log in</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
