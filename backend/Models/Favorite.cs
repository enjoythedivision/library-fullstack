using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Models;

[Index(nameof(UserId), nameof(BookId), IsUnique = true)]
public class Favorite
{
    public int Id { get; set; }

    public string UserId { get; set; } = string.Empty;
    public IdentityUser User { get; set; } = null!;

    public int BookId { get; set; }
    public Book Book { get; set; } = null!;
}
