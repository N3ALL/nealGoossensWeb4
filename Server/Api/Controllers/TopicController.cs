using Api.DTO;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;


namespace Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicRepository _topicRepo;
        private readonly IUserRepository _userRepo;
        private readonly IReplyRepository _replyRepo;
        private readonly JwtSecurityTokenHandler _handler;
        public TopicController(ITopicRepository repo, IUserRepository repo2, IReplyRepository repo3)
        {
            _topicRepo = repo;
            _userRepo = repo2;
            _replyRepo = repo3;
            _handler = new JwtSecurityTokenHandler();
        }
        // GET: api/Topic
        /// <summary>
        /// Get all Topics (no order)
        /// </summary>
        /// <returns>a List of topics</returns>
        [HttpGet]
        [AllowAnonymous]
        public List<TopicDTO> getAllTopics()
        {
            var list = new List<TopicDTO>();
            var array = new ReplyDTO[0];
            _topicRepo.getAll().ToList().ForEach(t => list.Add(new TopicDTO
            {
                title = t.title,
                user = t.user.username,
                description = t.description,
                dateOfCreation = t.dateOfCreation,
                numberOfReplies = t.replies.Count,
                status = t.status,
                id = t.ID,
                userReplies = array
            })); ;
            return list;
        }
        /// <summary>
        /// gets one topic with its replies based on id
        /// </summary>
        
        /// <param name="id">topicId</param>
        /// <returns>one topic</returns>
        [HttpGet("{id}/topicdetails")]
        [AllowAnonymous]
        public ActionResult<TopicDTO> getTopicAndReplies(int id)
        {

            var topic = _topicRepo.getTopicById(id);
            if (topic == null)
            {
                return NotFound();
            }
            var DTOlist = new List<ReplyDTO>();
            topic.replies.ToList().ForEach(r => DTOlist.Add(new ReplyDTO {
                ID = r.ID,
                dateOfCreation = r.dateOfCreation,
                description = r.description,
                status = r.status,
                user = r.user.username
            }));
            var topicDTO = new TopicDTO
            {
                id = topic.ID,
                description = topic.description,
                dateOfCreation = topic.dateOfCreation,
                title = topic.title,
                numberOfReplies = topic.replies.Count,
                user = topic.user.username,
                userReplies = DTOlist,
                status = topic.status,
            };
            return topicDTO;

        }
        // GET: api/Topic
        /// <summary>
        /// Get one topic based on title
        /// </summary>
        /// <param name="title">title of the topic</param>
        /// <returns>one topic</returns>
        [HttpGet("{title}")]
        [AllowAnonymous]
        public ActionResult<Topic> getTopicByTitle(string title)
        {
            Topic foundTopic = _topicRepo.getTopicByTitle(title);
            if (foundTopic == null)
                return NotFound();
            return foundTopic;
        }
        // POST: api/Topic
        /// <summary>
        /// create new topic and persist
        /// </summary>
        /// <param name="model">the topic</param>
        /// <param name="token">JWTtoken of the user</param>
        

        [HttpPost("postTopic/{token}")]
        public ActionResult<Topic> PostTopic(Topic model, string token)
        {
            Topic newTopic = new Topic() { title = model.title, description = model.description, dateOfCreation = DateTime.Now, status = StatusTopic.NOTSOLVED, user = _userRepo.GetBy(_handler.ReadJwtToken(token).Payload.Sub) };
            _topicRepo.Add(newTopic);
            _topicRepo.SaveChanges();
            return NoContent();
        }
        
        /// <summary>
        /// Get all topics from the logged in user
        /// </summary>
        /// <param name="token">JWTtoken of user</param>
        /// <returns>a list of topics</returns>
        [HttpGet("userTopics/{token}")]
        public List<TopicDTO> getAllTopicsFromUser(string token)
        {
            var list = new List<TopicDTO>();
            var array = new ReplyDTO[0];
            var useremail = _userRepo.GetBy(_handler.ReadJwtToken(token).Payload.Sub).emailAdress;
            _topicRepo.getAllFromUser(useremail).ToList().ForEach(t => list.Add(new TopicDTO
            {
                title = t.title,
                user = t.user.username,
                description = t.description,
                dateOfCreation = t.dateOfCreation,
                numberOfReplies = t.replies.Count,
                status = t.status,
                id = t.ID,
                userReplies = array
            })); ;
            return list;
        }
        
        /// <summary>
        /// Get all topics from another user
        /// </summary>
        /// <param name="email">email of the other user</param>
        /// <returns>a list of topics</returns>
        [HttpGet("userTopicsVisitor/{email}")]
        [AllowAnonymous]
        public List<TopicDTO> getAllTopicsFromUserVisitor(string email)
        {
            var list = new List<TopicDTO>();
            var array = new ReplyDTO[0];
            _topicRepo.getAllFromUser(email).ToList().ForEach(t => list.Add(new TopicDTO
            {
                title = t.title,
                user = t.user.username,
                description = t.description,
                dateOfCreation = t.dateOfCreation,
                numberOfReplies = t.replies.Count,
                status = t.status,
                id = t.ID,
                userReplies = array
            })); ;
            return list;
        }

        /// <summary>
        /// deletes a topic from a logged in user
        /// </summary>
        /// <param name="id">topicId</param>
        /// <param name="token">JWTtoken of the user</param>
        
        [HttpDelete("deleteTopic/{id}/{token}")]
        public IActionResult DeleteTopic(int id, string token)
        {
            Console.WriteLine(id);

            User user = _userRepo.GetBy(_handler.ReadJwtToken(token).Payload.Sub);
            Topic topic = _topicRepo.getTopicById(id);
            if (user != null)
            {
                deleteTopicReplies(topic);
                _topicRepo.Delete(topic);
                _topicRepo.SaveChanges();
            }
            else
            {
                return NotFound();
            }

            return NoContent();
        }

        private void deleteTopicReplies(Topic topic)
        {
            topic.replies.ToList().ForEach(r => _replyRepo.Delete(r));
            _replyRepo.saveChanges();
        }

    }
}
