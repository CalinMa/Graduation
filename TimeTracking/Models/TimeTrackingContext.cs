using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace TimeTracking.Models
{
    public class TimeTrackingContext : DbContext
    {
        public TimeTrackingContext(DbContextOptions<TimeTrackingContext> options)
            : base(options)
        {
        }

        public DbSet<TimeTrackingItem> TimeTrackings { get; set; } = null!;
    }
}