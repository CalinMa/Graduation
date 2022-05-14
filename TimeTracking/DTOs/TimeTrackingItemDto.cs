namespace TimeTracking.DTOs
{
    public class TimeTrackingItemDto
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? Date { get; set; }

        public string? Description { get; set; }

        public int Hours { get; set; }
        
    }
}