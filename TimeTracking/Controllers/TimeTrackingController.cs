using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeTracking.DTOs;
using TimeTracking.Models;

namespace TimeTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeTrackingController : ControllerBase
    {
        private readonly TimeTrackingContext _context;

        public TimeTrackingController(TimeTrackingContext context)
        {
            _context = context;
        }

        // GET: api/TimeTracking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimeTrackingItemDto>>> GetTimeTrackings(string? date, int? hours)
        {

            var query = _context.TimeTrackings.AsQueryable();
            if (hours != null){
                query = query.Where(item => item.Hours == hours.Value);
            }

            if (date != null){
                query = query.Where(item => item.Date == date);
            }
            
            return await query.Select(item => ItemToDTO(item)).ToListAsync();

        //   if (_context.TimeTrackings == null)
        //   {
        //       return NotFound();
        //   }
        //     return await _context.TimeTrackings
        //     .Select(x => ItemToDTO(x))
        //     .ToListAsync();
        }

        // GET: api/TimeTracking/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TimeTrackingItemDto>> GetTimeTrackingItem(long id)
        {
          if (_context.TimeTrackings == null)
          {
              return NotFound();
          }
            var timeTrackingItem = await _context.TimeTrackings.FindAsync(id);

            if (timeTrackingItem == null)
            {
                return NotFound();
            }

            return ItemToDTO(timeTrackingItem);
        }

        // PUT: api/TimeTracking/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimeTrackingItem(long id, TimeTrackingItemDto timeTrackingItemDto)
        {
            if (id != timeTrackingItemDto.Id)
            {
                return BadRequest();
            }

           // _context.Entry(timeTrackingItem).State = EntityState.Modified;
           var timeTrackingItem = await _context.TimeTrackings.FindAsync(id);
           
           if (timeTrackingItem == null){
               return NotFound();
           }

            timeTrackingItem.Name = timeTrackingItemDto.Name;
            timeTrackingItem.Date = timeTrackingItemDto.Date;
            timeTrackingItem.Description = timeTrackingItemDto.Description;
            timeTrackingItem.Hours = timeTrackingItemDto.Hours;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeTrackingItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TimeTracking
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TimeTrackingItem>> PostTimeTrackingItem(TimeTrackingItemDto timeTrackingItemDto)
        {
          if (_context.TimeTrackings == null)
          {
              return Problem("Entity set 'TimeTrackingContext.TimeTrackings'  is null.");
          }
          var timeTrackingItem = new TimeTrackingItem {
                    Name = timeTrackingItemDto.Name,
                    Date = timeTrackingItemDto.Date,
                    Description = timeTrackingItemDto.Description,
                    Hours = timeTrackingItemDto.Hours
                };
            _context.TimeTrackings.Add(timeTrackingItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimeTrackingItem", new { id = timeTrackingItemDto.Id },ItemToDTO(timeTrackingItem));
        }

        // DELETE: api/TimeTracking/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeTrackingItem(long id)
        {
            if (_context.TimeTrackings == null)
            {
                return NotFound();
            }
            var timeTrackingItem = await _context.TimeTrackings.FindAsync(id);
            if (timeTrackingItem == null)
            {
                return NotFound();
            }

            _context.TimeTrackings.Remove(timeTrackingItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TimeTrackingItemExists(long id)
        {
            return (_context.TimeTrackings?.Any(e => e.Id == id)).GetValueOrDefault();
        }

          private static TimeTrackingItemDto ItemToDTO(TimeTrackingItem timeTrackingItem) =>
            new TimeTrackingItemDto
            {
                Id = timeTrackingItem.Id,
                Name = timeTrackingItem.Name,
                Date = timeTrackingItem.Date,
                Description = timeTrackingItem.Description,
                Hours = timeTrackingItem.Hours
            };
    }
}
