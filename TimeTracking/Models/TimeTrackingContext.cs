using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace TimeTracking.Models
{
    public class TimeTrackingContext : DbContext
    {
        protected readonly IConfiguration configuration;
        public TimeTrackingContext(DbContextOptions<TimeTrackingContext> options, IConfiguration configuration)
            : base(options)
        {
            this.configuration = configuration;
        }
         protected override void OnConfiguring(DbContextOptionsBuilder options)
         {
        // connect to sql server with connection string from app settings
      
        if (!options.IsConfigured){
        options.UseSqlServer(this.configuration.GetConnectionString("WebApiDatabase"), builder => builder.EnableRetryOnFailure());
        }
        base.OnConfiguring(options);
        }
        public DbSet<TimeTrackingItem> TimeTrackings { get; set; } = null!;
    }
}