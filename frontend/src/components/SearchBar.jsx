import "./SearchBar.css";

export default function SearchBar({searchTerm, setSearchTerm, availabilityFilter, setAvailabilityFilter}) {
  return (
    <div className="searchBar">
      <div className="titleSearch">
        <input
          type="search"
          placeholder="Search title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="availabilitySearch">
        <input
          type="radio"
          id="all"
          name="availability"
          value="all"
          checked={availabilityFilter === "all"}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        />
        <label htmlFor="all">All</label>

        <input
          type="radio"
          id="available"
          name="availability"
          value="available"
          checked={availabilityFilter === "available"}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        />
        <label htmlFor="available">Available</label>

        <input
          type="radio"
          id="borrowed"
          name="availability"
          value="borrowed"
          checked={availabilityFilter === "borrowed"}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        />
        <label htmlFor="borrowed">Borrowed</label>
      </div>
    </div>
  );
}