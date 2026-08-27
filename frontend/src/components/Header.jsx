import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({ user, isAdmin }) {
  return (
    <header>
      <div className="left">
        <span>Library app.</span>
      </div>
      <div className="right">
        <nav>
          <ul>
            <li>
              <Link to="/">Books</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            {user ? (
              <>
                {isAdmin && (
                  <li>
                    <Link to="/addbook">+ Add Book</Link>
                  </li>
                )}

                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
