using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Notes.API.Models;

namespace Notes.API.Data
{
    public class ApiDbContext : IdentityDbContext
    {
        public DbSet<Note> Notes { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }
    }
}