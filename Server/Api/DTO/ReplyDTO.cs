using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class ReplyDTO
    {
        public int ID { get; set; }
        public String description { get; set; }
        public DateTime dateOfCreation { get; set; }
        public StatusReply status { get; set; }
        public string user { get; set; }
    }
}
