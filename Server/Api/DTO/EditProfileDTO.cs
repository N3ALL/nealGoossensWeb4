using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class EditProfileDTO
    {
        [Required]
        [StringLength(200)]
        public String firstname { get; set; }

        [Required]
        [StringLength(250)]
        public String lastname { get; set; }

        [Required]
        public String username { get; set; }
        [StringLength(250)]
        public String institution { get; set; }
        [StringLength(250)]
        public String fieldOfStudy { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
    }
}
