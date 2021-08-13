using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class TopicDTO
    {
        public string title { get; set; }
        public string description { get; set; }
        public DateTime dateOfCreation { get; set;}
        public int numberOfReplies { get; set; }
        public string user { get; set; }
        public StatusTopic status { get; set; }
        public int id { get; set; }
        public ICollection<ReplyDTO> userReplies { get; set; }

    }
}
