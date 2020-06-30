using System.ComponentModel.DataAnnotations;

namespace Gifter.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        [Required]
        public int PostId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Post Post { get; set; }
    }
}