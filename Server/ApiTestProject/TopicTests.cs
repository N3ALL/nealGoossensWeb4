using FakeItEasy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ApiTestProject
{
    public class TopicTests
    {
        [Fact]
        public void NewTopic_titleIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new Topic { title = null, description = "test", user = A.Fake<User>() });
        }
        [Fact]
        public void NewTopic_userIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new Topic { title = "test", description = "test", user = null });
        }
        [Fact]
        public void NewTopic_descriptionIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new Topic { title = "test", description = null, user = A.Fake<User>() });
        }
    }
}
