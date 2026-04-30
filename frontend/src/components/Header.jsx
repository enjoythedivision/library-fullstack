import "./Header.css"

export default function Header() {
  return (
    <header>
      <div className="left">
        <span>Library app.</span>
      </div>
      <div className="right">
        <nav>
          <ul>
            <ol>Books</ol>
            <ol>About</ol>
          </ul>
        </nav>
      </div>
    </header>
  );
}
