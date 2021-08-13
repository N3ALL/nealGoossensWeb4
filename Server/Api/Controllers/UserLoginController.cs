using Api.DTO;
using Api.MailService;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IConfiguration _config;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtSecurityTokenHandler _handler;
        private readonly EmailService _emailservice;
        private readonly IReplyRepository _replyRepo;
        private readonly ITopicRepository _topicRepo;

        public UserLoginController(IUserRepository repo, SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IConfiguration config, IReplyRepository repo2, ITopicRepository repo3)
        {
            _replyRepo = repo2;
            _topicRepo = repo3;
            _emailservice = new EmailService(config);
            _signInManager = signInManager;
            _userManager = userManager;
            _userRepo = repo;
            _config = config;
            _handler = new JwtSecurityTokenHandler();
        }
        /// <summary>
        /// Checks if an email is available as username
        /// </summary>
        /// <returns>true if the email is not registered yet</returns>
        /// <param name="email">Email.</param>/
        [AllowAnonymous]
        [HttpGet("{email}")]
        public async Task<ActionResult<Boolean>> CheckAvailableUserName(string email)
        {
            var user = await _userManager.FindByNameAsync(email);
            return user == null;
        }

        /// <summary>
        /// Login
        /// </summary>
        /// <param name="model">the login details</param>
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<String>> CreateToken(LoginDTO model)
        {

            var user = await _userManager.FindByNameAsync(model.Email);

            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                if (result.Succeeded)
                {
                    string token = GetToken(user);

                    return Created("", token); //returns only the token                    
                }
            }
            return BadRequest();
        }

        /// <summary>
        /// Register a user
        /// </summary>
        /// <param name="model">the user details</param>
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<String>> Register(RegisterDTO model)
        {


            IdentityUser user = new IdentityUser { UserName = model.Email, Email = model.Email };
            User ModelUser = new User { username = model.username, emailAdress = model.Email, surname = model.FirstName, name = model.LastName, institution = model.Institution, fieldOfStudy = model.FieldOfStudy, status = StatusUser.ACTIVE };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                _emailservice.SendEmail(model.Email, model.username, model.LastName, model.FirstName);
                _userRepo.Add(ModelUser);
                _userRepo.SaveChanges();
                string token = GetToken(user);



                return Created("", token);
            }
            return BadRequest();

        }
        /// <summary>
        /// gets the profile information from the user
        /// </summary>
        /// <returns>a user object connected to the JWTtoken</returns>
        /// <param name="token">jwttoken</param>/
        [HttpGet("getProfile/{token}")]
        public ActionResult<User> getProfile(string token)
        {

            return _userRepo.GetBy(_handler.ReadJwtToken(token).Payload.Sub);
        }
        /// <summary>
        /// edits the profile
        /// </summary>
        /// <returns>nothing</returns>
        /// <param name="model">model</param>/
        [HttpPut("editProfile")]
        public void editProfile(EditProfileDTO model)
        {
            User targetuser = _userRepo.GetBy(model.email);
            targetuser.editProfile(model.username, model.firstname, model.lastname, model.institution, model.fieldOfStudy);

            _userRepo.SaveChanges();


        }
        /// <summary>
        /// gets profile from a reply of that user
        /// </summary>
        /// <returns>a user</returns>
        /// <param name="id">id</param>/
        [HttpGet("visitProfileThroughReply/{id}")]
        public ActionResult<User> getProfileByReplyId(int id){
            var x = _replyRepo.GetBy(id);
            if (x != null) return x.user;
            else return NoContent();
            
        }
         /// <summary>
         /// gets profile from a topic of that user
         /// </summary>
         /// <returns>true if the email is not registered yet</returns>
         /// <param name="email">Email.</param>/
        [HttpGet("visitProfileThroughTopic/{id}")]
        public ActionResult<User> getProfileByTopicId(int id)
        {
            var x = _topicRepo.getTopicById(id);
            if (x != null) return x.user;
            else return NoContent();
        }
        private String GetToken(IdentityUser user)
        {
            // Create the token
            var claims = new[]
            {
              new Claim(JwtRegisteredClaimNames.Sub, user.Email),
              new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              null, null,
              claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);
            
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
