export default function Favorites({
  favorites,
  favoritesError,
  handleRemoveFavorite,
}) {
  return (
    <section className="favorites-page">
      <h1>My favorites</h1>

      {favoritesError && (
        <p className="feedback feedback-error" role="alert">
          {favoritesError}
        </p>
      )}

      {favorites.length === 0 ? (
        !favoritesError && (
          <p className="page-note">Your favorites are empty.</p>
        )
      ) : (
        <div>
          {favorites.map((favorite) => (
            <div className="favorite-row" key={favorite.id}>
              {favorite.imageUrl && (
                <img src={favorite.imageUrl} alt={`${favorite.title} cover`} />
              )}

              <div className="favorite-info">
                <p><strong>{favorite.title}</strong></p>
                <p className="page-note">{favorite.author}</p>
              </div>

              <button
                className="button button-secondary"
                onClick={() => handleRemoveFavorite(favorite.id)}
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
