using System.ComponentModel.DataAnnotations;

namespace Notes.API.DTOs.Requests.Notes
{
    public class NoteRequestDto
    {
        public int NoteId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
    }
}