import "./Header.css";
import { Link, NavLink } from "react-router-dom";

export default function Header({ user, isAdmin }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Library home">
        Library<span className="brand-dot">.</span>
      </Link>
      <nav aria-label="Main navigation">
        <ul>
          <li><NavLink to="/" end className="nav-link">Books</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          {user ? (
            <>
              {isAdmin && (
                <li><Link className="button button-primary" to="/addbook">+ Add book</Link></li>
              )}
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
