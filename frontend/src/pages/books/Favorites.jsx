export default function Favorites({ favorites, favoritesError, handleRemoveFavorite }) {
  return (
    <section className="favorites-page">
      <h1>My favorites</h1>

      {favoritesError && (
        <p className="feedback feedback-error" role="alert">{favoritesError}</p>
      )}

      {favorites.length === 0 ? (
        !favoritesError &&
        <p className="page-note">Your favorites is empty.</p>
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
