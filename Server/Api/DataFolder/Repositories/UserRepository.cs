using Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataFolder.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppModelContext _context;
        private readonly DbSet<User> _users;
        public UserRepository(AppModelContext context)
        {
            _context = context;
            _users = context.Users;
        }
        public void Add(User user)
        {
            _users.Add(user);
        }

        public User GetBy(String email)
        {
            return _users.SingleOrDefault(u => u.emailAdress == email);
            //return _users.SingleOrDefault(u => u.emailAdress == email);
        }

        public bool IsEmailKnown(string email)
        {
            if (_users.Any(u => u.emailAdress == email))
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _users.Update(user); 
        }
    }
}
