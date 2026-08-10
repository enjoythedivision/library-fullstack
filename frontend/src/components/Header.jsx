import "./Header.css";
import { Link } from "react-router-dom";

export default function Header({ user }) {
  return (
    <header>
      <div className="left">
        <span>Library app.</span>
      </div>
      <div className="right">
        <nav>
          <ul>
            {user ? (
              <>
                <li>
                  <Link to="/">Logout</Link> 
                  {/* TODO: Add logout page + logic */}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}

            <li>
              <Link to="/">Books</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/addbook">+ Add Book</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
