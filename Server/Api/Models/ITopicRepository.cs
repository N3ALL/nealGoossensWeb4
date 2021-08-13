using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public interface ITopicRepository
    {
        IEnumerable<Topic> getAll();
        void Add(Topic topic);
        void Update(Topic topic);
        void SaveChanges();
        Topic getTopicByTitle(string title);

        Topic getTopicById(int id);
        void Delete(Topic topic);
        IEnumerable<Topic> getAllFromUser(string email);
    }
}
