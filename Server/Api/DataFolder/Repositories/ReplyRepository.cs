using Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataFolder.Repositories
{
    public class ReplyRepository : IReplyRepository
    {
        private readonly AppModelContext _context;
        private readonly DbSet<Reply> _replies;
        public ReplyRepository(AppModelContext context)
        {
            _context = context;
            _replies = context.Replies;
        }

        public void Delete(Reply reply)
        {
            _replies.Remove(reply);
        }

        public Reply GetBy(int id)
        {
            return _replies.Include(r => r.user).Include(r => r.topic).ThenInclude(t => t.user).SingleOrDefault(r => r.ID == id);
        }

        public void saveChanges()
        {
            _context.SaveChanges();
        }
    }
}
