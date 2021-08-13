using Microsoft.AspNetCore.Identity;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataFolder
{
    public class DbInitializer
    {
        private readonly AppModelContext _appContext;
        private readonly UserManager<IdentityUser> _userManager;

        public DbInitializer(AppModelContext appcontext, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _appContext = appcontext;
        }

        public async Task InitializeDataAsync()
        {
            _appContext.Database.EnsureDeleted();
            if (_appContext.Database.EnsureCreated()) {
                var list = new ArrayList();
                User user1 = new User("neal", "goossens", "neal1", "email1@gmail.com", "HoGent", "TI", StatusUser.ACTIVE, DateTime.Now);
                list.Add(user1);
                User user2 = new User("neal2", "goossens2", "neal2", "email2@gmail.com", "HoGent", "TI", StatusUser.ACTIVE, DateTime.Now);
                list.Add(user2);
                User user3 = new User("neal3", "goossens3", "neal3", "email3@gmail.com", "HoGent", "TI", StatusUser.ACTIVE, DateTime.Now);
                list.Add(user3);
                User user4 = new User("neal4", "goossens4", "neal4", "email4@gmail.com", "HoGent", "TI", StatusUser.ACTIVE, DateTime.Now);
                list.Add(user4);
                Topic topic1 = new Topic("Title1", "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur ? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur ?", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic2 = new Topic("Title2", "DescriptionTest1",StatusTopic.NOTSOLVED, user2, DateTime.Now);
                Topic topic3 = new Topic("Title3", "DescriptionTest1", StatusTopic.NOTSOLVED, user3, DateTime.Now);
                Topic topic4 = new Topic("Title4", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic5 = new Topic("Title5", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic6 = new Topic("Title6", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic7 = new Topic("Title7", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic8 = new Topic("Title8", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic9 = new Topic("Title9", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic10 = new Topic("Title10", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic11 = new Topic("Title11", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Topic topic12 = new Topic("Title12", "DescriptionTest1", StatusTopic.NOTSOLVED, user1, DateTime.Now);
                Reply reply1 = new Reply("testdescription1efkefjefjefef kekefkefkefkefkefefkefkefkefk kefkfekeffffffffffffffffffffffffffffffffffffffffffffff kef kfekefkefkfeefkfek  ekfefkfe kfeke kefkefkefkefefkefkefkefkfekfezfjkfekofjkzfzeiofezjzefjzfejiofezifezfzeijzfejiofzejifezjifoezifoezjfezjiofzejiofezjiofezjiozfejiofezjiofeijefziojefz", StatusReply.BASIC, user2, topic4);
                Reply reply2 = new Reply("testdescription2", StatusReply.BASIC, user2, topic4);
                Reply reply3 = new Reply("testdescription3", StatusReply.BASIC, user2, topic4);
                await CreateUser(user1.emailAdress, "Password_1");
                _appContext.Users.Add(user1);
                _appContext.Users.Add(user2);
                _appContext.Users.Add(user3);
                _appContext.Users.Add(user4);
                _appContext.Topics.Add(topic1);
                _appContext.Topics.Add(topic2);
                _appContext.Topics.Add(topic3);
                _appContext.Topics.Add(topic4);
                _appContext.Topics.Add(topic5);
                _appContext.Topics.Add(topic6);
                _appContext.Topics.Add(topic7);
                _appContext.Topics.Add(topic8);
                _appContext.Topics.Add(topic9);
                _appContext.Topics.Add(topic10);
                _appContext.Topics.Add(topic11);
                _appContext.Topics.Add(topic12);
                _appContext.Replies.Add(reply1);
                _appContext.Replies.Add(reply2);
                _appContext.Replies.Add(reply3);
                _appContext.SaveChanges();
            }
            
            }

        private async Task CreateUser(string email, string password)
        {
            
            var user = new IdentityUser { UserName = email, Email = email };
            await _userManager.CreateAsync(user, password);
        }

    }
}
