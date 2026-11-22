using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class FavoritesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public FavoritesController(
        AppDbContext context,
        UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetFavouriteBooks()
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser is null)
        {
            return Unauthorized();
        }

        var favoriteBooks = await _context.Favorites
            .Where(favorite => favorite.UserId == currentUser.Id)
            .Select(favorite => favorite.Book)
            .ToListAsync();

        return favoriteBooks;
    }

    [HttpPost("{bookId}")]
    public async Task<IActionResult> AddFavorite(int bookId)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser is null)
        {
            return Unauthorized();
        }

        var bookExists = await _context.Books
            .AnyAsync(book => book.Id == bookId);

        if (!bookExists)
        {
            return NotFound();
        }

        var alreadyFavorite = await _context.Favorites
            .AnyAsync(favorite =>
                favorite.UserId == currentUser.Id &&
                favorite.BookId == bookId);

        if (alreadyFavorite)
        {
            return Conflict("Book is already in your favorites.");
        }

        _context.Favorites.Add(new Favorite
        {
            BookId = bookId,
            UserId = currentUser.Id
        });

        await _context.SaveChangesAsync();
        return CreatedAtAction();
    }
}
