using Api.DTO;
using Api.MailService;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DataFolder.Repositories
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReplyController : Controller
    {
        private readonly ITopicRepository _topicRepo;
        private readonly IReplyRepository _replyRepo;
        private readonly IUserRepository _userRepo;
        private readonly JwtSecurityTokenHandler _handler;
        private readonly EmailService _emailservice;
        public ReplyController(ITopicRepository repo, IReplyRepository repo2, IUserRepository repo3, IConfiguration config)
        {
            _emailservice = new EmailService(config);
            _topicRepo = repo;
            _replyRepo = repo2;
            _userRepo = repo3;
            _handler = new JwtSecurityTokenHandler();
        }
        /// <summary>
        /// gets all the replies of a topic
        /// </summary>
        /// <param name="id">topicId</param>
        /// <returns>a list of replies</returns>
        [HttpGet("{Id}/TopicReplies")]
        public List<ReplyDTO> getAllReplies(int Id)
        {
            var DTOlist = new List<ReplyDTO>();
            _topicRepo.getTopicById(Id).replies.ToList()
              .ForEach(r => DTOlist.Add(new ReplyDTO
            {
                ID = r.ID,
                dateOfCreation = r.dateOfCreation,
                description = r.description,
                status = r.status,
                user = r.user.username
            }));
            return DTOlist;
        }
         /// <summary>
         /// post a comment on a topic
         /// </summary>
         /// <param name="model">the reply details</param>
         /// <param name="token">JWTtoken of the user</param>
         /// <returns></returns>
        [HttpPost("postComment/{token}")]
        public ActionResult<Reply> PostReply(NewReplyDTO model, string token)
        {
            var jwtSecurityToken = _handler.ReadJwtToken(token);
            if (jwtSecurityToken.Payload.Sub == null)
            {
                return BadRequest();
            }
            Topic topic = _topicRepo.getTopicById(model.id);
            User user = _userRepo.GetBy(jwtSecurityToken.Payload.Sub);
            
            topic.replies.Add(new Reply(model.description, StatusReply.BASIC, user, topic));
            switch (topic.replies.Count)
            {
                case 1: 
                        _emailservice.SendEmailReplyTarget(topic, 1);
                        break;
                case 10:
                        _emailservice.SendEmailReplyTarget(topic, 10);
                        break;
                case 50:
                        _emailservice.SendEmailReplyTarget(topic, 50);
                        break;
                   
            }
            
            _topicRepo.SaveChanges();
            
            return NoContent();
        }
        /// <summary>
        /// delete a comment
        /// </summary>
        /// <param name="id">the commentID</param>
        /// <param name="token">JWTtoken of the user</param>
        /// <returns></returns>
        [HttpDelete("deleteComment/{id}/{token}")]
        public IActionResult DeleteReply(int id, string token)
        {
            User user = _userRepo.GetBy(_handler.ReadJwtToken(token).Payload.Sub);
            Reply reply = _replyRepo.GetBy(id);

            if (user != null)
            {
                if (user.emailAdress == reply.user.emailAdress || reply.topic.user.emailAdress == user.emailAdress)
                {
                    if (user.emailAdress != reply.user.emailAdress)
                    {
                        _emailservice.SendEmailDeletedComment(reply);
                    }
                    _replyRepo.Delete(reply);
                    _replyRepo.saveChanges();
                }
            } else
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
