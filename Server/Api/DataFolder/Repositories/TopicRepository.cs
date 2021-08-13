using Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataFolder.Repositories
{
    public class TopicRepository : ITopicRepository
    {
        private readonly AppModelContext _context;
        private readonly DbSet<Topic> _topics;
        public TopicRepository(AppModelContext context)
        {
            _context = context;
            _topics = context.Topics;
        }
        public void Add(Topic topic)
        {
            _topics.Add(topic);
        }

        public void Delete(Topic topic)
        {
            _topics.Remove(topic);
        }

        public IEnumerable<Topic> getAll()
        {
            return _topics.Include(t => t.user).Include(t => t.replies);
        }

        public IEnumerable<Topic> getAllFromUser(string email)
        {
            return _topics.Include(t => t.user).Include(t => t.replies).Where(t => t.user.emailAdress == email);
        }

        public Topic getTopicById(int id)
        {
            return _topics.Include(t => t.replies).ThenInclude(r => r.user).Include(t => t.user).SingleOrDefault(c => c.ID == id);
        }

        public Topic getTopicByTitle(string title)
        {
            return _topics.FirstOrDefault(t => t.title.ToLower() == title.ToLower());
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(Topic topic)
        {
            _topics.Update(topic);
        }
    }
}
