using FakeItEasy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ApiTestProject
{
    public class ReplyTests
    {
        [Fact]
        public void NewReply_descriptionIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new Reply { description = null, user = A.Fake<User>(), topic = A.Fake<Topic>()});
        }
        [Fact]
        public void NewReply_userIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new Reply { description = "test", user = null, topic = A.Fake<Topic>() });
        }
        [Fact]
        public void NewReply_topicIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new Reply { description = "test", user = A.Fake<User>(), topic = null });
        }
    }
}
