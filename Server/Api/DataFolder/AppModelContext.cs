using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataFolder
{
    public class AppModelContext : IdentityDbContext<IdentityUser>
    {
        public AppModelContext(DbContextOptions<AppModelContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //user

            builder.Entity<User>()
                .HasMany(u => u.userTopics)
                .WithOne(t => t.user)
                .HasForeignKey("UserID");
            builder.Entity<User>()
                .HasMany(u => u.userReplies)
                .WithOne(r => r.user)
                .HasForeignKey("UserID");
                

            builder.Entity<User>().Property(u => u.username).IsRequired().HasMaxLength(50);
            builder.Entity<User>().Property(u => u.name).IsRequired().HasMaxLength(50);
            builder.Entity<User>().Property(u => u.surname).IsRequired().HasMaxLength(50);
            builder.Entity<User>().Property(u => u.dateOfRegistration).IsRequired();
            
            builder.Entity<User>().Property(u => u.emailAdress).IsRequired().HasMaxLength(50);
            builder.Entity<User>().Property(u => u.status).IsRequired();
            builder.Entity<User>().Property(u => u.institution).HasMaxLength(50);
            builder.Entity<User>().Property(u => u.fieldOfStudy).HasMaxLength(50);
            builder.Entity<User>().Property(u => u.ID).IsRequired().ValueGeneratedOnAdd();

            //topic
            
            builder.Entity<Topic>().Property(t => t.ID).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Topic>().Property(t => t.status).IsRequired();
            builder.Entity<Topic>().Property(t => t.dateOfCreation).IsRequired();
            builder.Entity<Topic>().Property(t => t.title).IsRequired().HasMaxLength(450);
            builder.Entity<Topic>().Property(t => t.description).IsRequired();
            

            //reply
 
            builder.Entity<Reply>().Property(r => r.ID).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Reply>().Property(t => t.description).IsRequired();
            builder.Entity<Reply>().Property(t => t.dateOfCreation).IsRequired();
            builder.Entity<Reply>().Property(t => t.status).IsRequired().HasMaxLength(450);
            builder.Entity<Reply>().Property(t => t.description).IsRequired();
            
        }
#pragma warning disable CS0114 // Member hides inherited member; missing override keyword
        public DbSet<User> Users { get; set; }
#pragma warning restore CS0114 // Member hides inherited member; missing override keyword
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Reply> Replies { get; set; }

    }
}
