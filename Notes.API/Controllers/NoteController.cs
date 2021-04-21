using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes.API.Data;
using Notes.API.DTOs.Requests.Notes;
using Notes.API.DTOs.Responses.Notes;
using Notes.API.Models;

namespace Notes.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class NoteController : ControllerBase
    {
        private readonly ApiDbContext _context;
        public NoteController(ApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var userId = this.User.Claims.First(i => i.Type == "Id").Value;
            var notes = (await _context.Notes.Where(note => note.UserId == userId).ToListAsync()).Select(note => new NoteResponse()
            {
                NoteId = note.NoteId,
                Title = note.Title,
                Description = note.Description
            });

            return Ok(notes);
        }

        [HttpGet("{id}", Name = "GetNote")]
        public async Task<IActionResult> GetNote(int id)
        {
            var existingNote = await _context.Notes.FirstOrDefaultAsync(x => x.NoteId == id);
            if (existingNote is null)
            {
                return NotFound();
            }
            var userId = this.User.Claims.First(i => i.Type == "Id").Value;
            if (userId != existingNote.UserId)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(new NoteResponse()
                {
                    NoteId = existingNote.NoteId,
                    Description = existingNote.Description,
                    Title = existingNote.Title
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote(NoteRequestDto noteDto)
        {
            if (ModelState.IsValid)
            {
                var newNote = new Note()
                {
                    Title = noteDto.Title,
                    Description = noteDto.Description,
                    UserId = this.User.Claims.First(i => i.Type == "Id").Value
                };
                var createdNote = await _context.AddAsync(newNote);
                await _context.SaveChangesAsync();

                // return CreatedAtAction("GetNote", new { createdNote.Entity.NoteId }, createdNote);
                return CreatedAtAction("GetNote", new { id = createdNote.Entity.NoteId }, createdNote.Entity);
            }
            return new JsonResult("Something went wrong") { StatusCode = 500 };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, NoteRequestDto noteDto)
        {
            if (ModelState.IsValid)
            {
                var existingNote = await _context.Notes.FirstOrDefaultAsync(x => x.NoteId == id);
                if (existingNote is null)
                {
                    return NotFound();
                }
                var userId = this.User.Claims.First(i => i.Type == "Id").Value;
                if (existingNote.UserId != userId)
                {
                    return Unauthorized();
                }
                else
                {
                    existingNote.Title = noteDto.Title;
                    existingNote.Description = noteDto.Description;

                    await _context.SaveChangesAsync();
                    return NoContent();
                }
            }
            return new JsonResult("Something went wrong") { StatusCode = 500 };
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var existingNote = await _context.Notes.SingleOrDefaultAsync(x => x.NoteId == id);
            if (existingNote is null)
            {
                return NotFound();
            }
            var userId = this.User.Claims.First(i => i.Type == "Id").Value;
            if (userId != existingNote.UserId)
            {
                return Unauthorized();
            }
            else
            {
                _context.Notes.Remove(existingNote);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

    }
}