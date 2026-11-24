using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models;

public class Book
{
    public int Id { get; set; }

    [Required]
    [StringLength(150)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(150)]
    public string Author { get; set; } = string.Empty;

    [StringLength(5000)]
    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public string? BorrowedByUserId { get; set; }

    [NotMapped]
    public bool IsBorrowedByMe { get; set; }
}
