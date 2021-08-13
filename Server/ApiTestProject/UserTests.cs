using System;
using Xunit;

namespace ApiTestProject
{
    public class UserTests
    {
        [Fact]
        public void NewUser_usernameIsRequired()
        { 
            Assert.Throws<ArgumentException>(() => new User { username = null, name = "test", emailAdress="test", surname = "test"});
        }
        [Fact]
        public void NewUser_nameIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new User { username = "test", name = null, emailAdress = "test", surname = "test" });
        }
        [Fact]
        public void NewUser_surnameIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new User { username = "test", name = "test", emailAdress = "test", surname = null });
        }
        [Fact]
        public void NewUser_emailIsRequired()
        {
            Assert.Throws<ArgumentException>(() => new User { username = "test", name = "test", emailAdress = null, surname = "test" });
        }

    }
}
