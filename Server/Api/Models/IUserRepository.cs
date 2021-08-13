using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public interface IUserRepository
    {
        User GetBy(String email);
        bool IsEmailKnown(String email);
        void Add(User user);
        void Update(User user);
        void SaveChanges();
    }
}
