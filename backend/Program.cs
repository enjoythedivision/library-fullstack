using LibraryApi.Data;
using LibraryApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("LibraryConnection")
    )
);

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<LibraryContext>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider
        .GetRequiredService<RoleManager<IdentityRole>>();

    var userManager = scope.ServiceProvider
        .GetRequiredService<UserManager<IdentityUser>>();

    if (!await roleManager.RoleExistsAsync("Admin"))
    {
        await roleManager.CreateAsync(new IdentityRole("Admin"));
    }

    var adminUser = await userManager.FindByEmailAsync("user@example.com");

    if (adminUser != null)
    {
        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}

app.UseCors("ReactPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthentication();

//ΜΙΝΙΜAL ENDPOINT TO CHECK IF THE USER IS AN ADMIN
app.MapGet("/is-admin", (ClaimsPrincipal user) =>
{
    return Results.Ok(new
    {
        isAdmin = user.IsInRole("Admin")
    });
})
.RequireAuthorization();

//MINIMAL LOGOUT ENDPOINT FROM DOCUMENTATION
app.MapPost("/logout", async (
    SignInManager<IdentityUser> signInManager,
    [FromBody] object empty) =>
{
    if (empty != null)
    {
        await signInManager.SignOutAsync();
        return Results.Ok();
    }

    return Results.Unauthorized();
})
.RequireAuthorization();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<IdentityUser>();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<LibraryContext>();

    if (!context.Books.Any())
    {
        context.Books.AddRange(
            new Book
            {
                Id = 1,
                Title = "Trainspotting",
                Author = "Irvine Welsh",
                ImageUrl = "/trainspotting.jpg",
                IsAvailable = true,
                Description = "Set against the backdrop of working-class Edinburgh, Trainspotting follows a loose group of friends bound together by heroin addiction, petty crime, and a shared sense of disillusionment. Through fragmented, dialect-heavy narration, Welsh constructs a brutal yet strangely intimate portrait of lives lived on the edge, where fleeting moments of humor and connection are constantly overshadowed by decay, relapse, and self-destruction. The novel refuses moral clarity, instead immersing the reader in a chaotic world where survival is uncertain and meaning feels perpetually out of reach."
            },
            new Book
            {
                Id = 2,
                Title = "Gemma",
                Author = "Dimitris Liantinis",
                ImageUrl = "/gemma.jpg",
                IsAvailable = true,
                Description = "Gemma is not a conventional narrative but a philosophical meditation on death, truth, and the limits of human understanding. Liantinis weaves together classical Greek thought, personal reflection, and existential inquiry, constructing a work that challenges both emotional and intellectual comfort. The text moves between poetic intensity and rigorous argument, confronting mortality not as an abstract concept but as an unavoidable and defining force. It is a demanding yet deeply resonant exploration of what it means to live with awareness of the end."
            },
            new Book
            {
                Id = 3,
                Title = "Letter to His Father",
                Author = "Franz Kafka",
                ImageUrl = "/letter.webp",
                IsAvailable = false,
                Description = "Written as an unsent confession, Kafka’s Letter to His Father exposes the emotional and psychological tension that defined his relationship with his domineering parent. Through careful yet deeply vulnerable prose, Kafka articulates feelings of inadequacy, fear, and alienation, tracing how paternal authority shaped his identity and sense of self. The letter transcends its personal origins, becoming a universal reflection on power, guilt, and the difficulty of being understood within familial structures."
            },
            new Book
            {
                Id = 4,
                Title = "The Trial",
                Author = "Franz Kafka",
                ImageUrl = "/trial.jpg",
                IsAvailable = true,
                Description = "The Trial tells the story of Josef K., a man arrested without explanation and forced to navigate a mysterious and oppressive legal system. As he searches for clarity, he becomes increasingly entangled in a bureaucratic nightmare that offers no answers and no escape. Kafka’s narrative captures a profound sense of anxiety and helplessness, presenting a world where logic dissolves and authority operates without justification. The novel remains a haunting exploration of alienation, guilt, and the absurd structures that govern modern life."
            },
            new Book
            {
                Id = 5,
                Title = "The Stranger",
                Author = "Albert Camus",
                ImageUrl = "/stranger.jpeg",
                IsAvailable = true,
                Description = "In The Stranger, Camus introduces Meursault, a man whose emotional detachment places him at odds with societal expectations. Following a senseless act of violence, Meursault is judged not only for his crime but for his inability to conform to accepted norms of grief and morality. Through sparse and precise prose, the novel embodies the philosophy of the absurd, confronting the tension between human desire for meaning and the indifferent nature of existence."
            },
            new Book
            {
                Id = 6,
                Title = "1984",
                Author = "George Orwell",
                ImageUrl = "/1984.jpeg",
                IsAvailable = true,
                Description = "Orwell’s 1984 presents a chilling vision of a totalitarian society in which every action, thought, and emotion is subject to surveillance and control. Through the story of Winston Smith, a man who dares to question the system, the novel explores themes of truth, language, and power. The world of Big Brother is one where history is rewritten, individuality is erased, and resistance is systematically crushed, making the book a timeless warning about the dangers of unchecked authority."
            },
            new Book
            {
                Id = 7,
                Title = "The Book Thief",
                Author = "Markus Zusak",
                ImageUrl = "/thief.jpg",
                IsAvailable = true,
                Description = "Narrated by Death itself, The Book Thief follows Liesel Meminger, a young girl growing up in Nazi Germany who finds solace in stealing and sharing books. As war intensifies around her, literature becomes a form of resistance and survival. The novel balances darkness with moments of profound humanity, illustrating how words can both destroy and save, and how even in the bleakest circumstances, compassion persists."
            },
            new Book
            {
                Id = 8,
                Title = "Les Misérables",
                Author = "Victor Hugo",
                ImageUrl = "/lesmiz.jpeg",
                IsAvailable = false,
                Description = "A sweeping epic of justice, redemption, and social struggle, Les Misérables follows the life of Jean Valjean, a man seeking to rebuild his life after imprisonment. Hugo interweaves personal stories with broader reflections on poverty, revolution, and morality, creating a deeply human narrative that examines both the cruelty and the potential for compassion within society."
            },
            new Book
            {
                Id = 9,
                Title = "Notes from Underground",
                Author = "Fyodor Dostoevsky",
                ImageUrl = "/underground.jpeg",
                IsAvailable = true,
                Description = "A fragmented and deeply introspective monologue, Notes from Underground explores the mind of an unnamed narrator who rejects rationality, society, and even his own desires. Through contradiction and self-awareness, Dostoevsky constructs a powerful critique of modern thought, revealing the complexity and irrationality that define human consciousness."
            },
            new Book
            {
                Id = 10,
                Title = "Crime and Punishment",
                Author = "Fyodor Dostoevsky",
                ImageUrl = "/crime.jpg",
                IsAvailable = true,
                Description = "Crime and Punishment follows Raskolnikov, a former student who commits a murder under the belief that he exists beyond conventional morality. As guilt and paranoia consume him, the novel delves into themes of justice, redemption, and the psychological consequences of transgression. Dostoevsky crafts a deeply intense exploration of conscience and the human capacity for both cruelty and compassion."
            },
            new Book
            {
                Id = 11,
                Title = "The Brothers Karamazov",
                Author = "Fyodor Dostoevsky",
                ImageUrl = "/karamazov.webp",
                IsAvailable = false,
                Description = "A profound philosophical and spiritual novel, The Brothers Karamazov centers on the lives of three brothers, each embodying different moral and intellectual perspectives. Through their conflicts, Dostoevsky examines faith, doubt, free will, and the nature of evil, creating a work that remains one of the most significant explorations of human belief and responsibility."
            },
            new Book
            {
                Id = 12,
                Title = "The Name of the Rose",
                Author = "Umberto Eco",
                ImageUrl = "/rose.jpg",
                IsAvailable = true,
                Description = "Set in a medieval monastery, The Name of the Rose blends mystery with philosophical inquiry as a series of murders unfolds within a world of secrecy and knowledge. Through its richly detailed setting and intellectual depth, Eco explores the tension between faith and reason, as well as the power of interpretation and hidden truths."
            },
            new Book
            {
                Id = 13,
                Title = "When Nietzsche Wept",
                Author = "Irvin D. Yalom",
                ImageUrl = "/nietzche.jpg",
                IsAvailable = true,
                Description = "A fictional encounter between philosopher Friedrich Nietzsche and physician Josef Breuer, this novel explores the intersection of philosophy and psychotherapy. Through dialogue and introspection, Yalom examines suffering, freedom, and the search for meaning, presenting a deeply human story of intellectual and emotional transformation."
            },
            new Book
            {
                Id = 14,
                Title = "Manufacturing Consent",
                Author = "Noam Chomsky",
                ImageUrl = "/consent.jpg",
                IsAvailable = false,
                Description = "In Manufacturing Consent, Chomsky analyzes the role of mass media in shaping public perception and maintaining power structures. Through the concept of the ‘propaganda model,’ the book reveals how information is filtered and presented, challenging the assumption of objective journalism and encouraging critical engagement with media narratives."
            }
        );

        context.SaveChanges();
    }
}

app.Run();
