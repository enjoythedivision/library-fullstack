using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using LibraryApi.Hubs;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IHubContext<NotificationsHub> _hubContext;


    public BooksController(
        AppDbContext context,
        UserManager<IdentityUser> userManager, 
        IHubContext<NotificationsHub> hubContext)
    {
        _context = context;
        _userManager = userManager;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        var currentUserId = _userManager.GetUserId(User);
        var books = await _context.Books.ToListAsync();

        foreach (var book in books)
        {
            book.IsBorrowedByMe = currentUserId != null &&
                book.BorrowedByUserId == currentUserId;
        }

        return books;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var currentUserId = _userManager.GetUserId(User);
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        book.IsBorrowedByMe = currentUserId != null && book.BorrowedByUserId == currentUserId;

        return book;
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBook(int id, Book book)
    {
        if (id != book.Id)
        {
            return BadRequest();
        }

        var existingBook = await _context.Books.FindAsync(id);
        if (existingBook == null)
        {
            return NotFound();
        }

        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Description = book.Description;
        existingBook.ImageUrl = book.ImageUrl;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Book>> PostBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetBook", new { id = book.Id }, book);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [Authorize]
    [HttpPost("{id}/borrow")]
    public async Task<IActionResult> BorrowBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return Unauthorized();
        }

        if (book.BorrowedByUserId != null)
        {
            return BadRequest("Book is already borrowed.");
        }

        book.BorrowedByUserId = currentUser.Id;
        await _context.SaveChangesAsync();

        return NoContent();

    }

    [Authorize]
    [HttpPost("{id}/return")]
    public async Task<IActionResult> ReturnBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        var currentUser = await _userManager.GetUserAsync(User);

        if (currentUser == null)
        {
            return Unauthorized();
        }

        if (book.BorrowedByUserId != currentUser.Id)
        {
            return Forbid();
        }

        book.BorrowedByUserId = null;

        await _context.SaveChangesAsync();

        var notifiedUsers = await _context.Favorites.Where(f => f.BookId == book.Id).Select(f=>f.UserId).ToListAsync();

        return NoContent();
    }

}
