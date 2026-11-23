export default function Favorites({ favorites, handleRemoveFavorite}) {
  return (
    <section className="favorites-page">
      <h1>My favourites</h1>

      {favorites.length === 0 ? (
        <p className="page-note">Your wishlist is empty.</p>
      ) : (
        <div>
          {favorites.map(f => (
            <div className="favorite-row" key={f.id}>
              {f.imageUrl && (
                <img src={f.imageUrl} alt={`${f.title} cover`} />
              )}

              <div className="favorite-info">
                <p><strong>{f.title}</strong></p>
                <p className="page-note">{f.author}</p>
              </div>

              <button
                className="button button-secondary"
                onClick={() => handleRemoveFavorite(f.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}