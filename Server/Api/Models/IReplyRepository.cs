using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public interface IReplyRepository
    {
        public Reply GetBy(int id);
        public void Delete(Reply reply);

        public void saveChanges();
    }
}
