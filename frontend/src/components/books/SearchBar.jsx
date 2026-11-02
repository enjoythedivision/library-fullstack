import "./SearchBar.css";

export default function SearchBar({ searchTerm, setSearchTerm, availabilityFilter, setAvailabilityFilter }) {
  return (
    <div className="catalog-toolbar">
      <div className="catalog-search">
        <label className="visually-hidden" htmlFor="book-search">Search books by title or author</label>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          id="book-search"
          type="search"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <fieldset className="availability-filters">
        <legend className="visually-hidden">Filter by availability</legend>
        {[['all', 'All books'], ['available', 'Available'], ['borrowed', 'Borrowed']].map(([value, label]) => (
          <label className="availability-filter" key={value}>
            <input
              type="radio"
              name="availability"
              value={value}
              checked={availabilityFilter === value}
              onChange={(event) => setAvailabilityFilter(event.target.value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
