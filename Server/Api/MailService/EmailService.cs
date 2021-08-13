using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;


namespace Api.MailService
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        SmtpClient client;
        public EmailService(IConfiguration config)
        {
            _config = config;
            client = new SmtpClient()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                EnableSsl = true,
            Credentials = new NetworkCredential("projectweb4neal@gmail.com", _config["EmailService:password"])

            };
        }
        
        public void SendEmail(string email, string username, string lastname, string firstname)
        {
            MailAddress from = new MailAddress("projectweb4neal@gmail.com", "web4forum");
            MailAddress recipient = new MailAddress(email);
            MailMessage message = new MailMessage()
            {
                From = from,
                Subject = "welcome " + firstname + " " + lastname,
                Body = "Welcome to the forum, your username is: " + username,
            };
            
            message.To.Add(recipient);
            client.Send(message);
        }
        public void SendEmailDeletedComment(Reply reply)
        {
            MailAddress from = new MailAddress("projectweb4neal@gmail.com", "web4forum");
            MailAddress recipient = new MailAddress(reply.user.emailAdress);
            MailMessage message = new MailMessage()
            {
                From = from,
                Subject = "your comment was deleted",
                Body = "Your comment on topic: " + reply.topic.title + " was deleted by the writer of the topic.",
            };
            message.To.Add(recipient);
            client.Send(message);
        }

        internal void SendEmailReplyTarget(Topic topic, int count)
        {
            MailAddress from = new MailAddress("projectweb4neal@gmail.com", "web4forum");
            MailAddress recipient = new MailAddress(topic.user.emailAdress);
            MailMessage message = null;
            if (count == 1)
            {
                message = new MailMessage()
                {
                    From = from,
                    Subject = "Your topic",
                    Body = "Your topic has received it's first comment! Go check it out!",
                };
            } else
            {
                message = new MailMessage()
                {
                    From = from,
                    Subject = "Your topic",
                    Body = "Your topic has received it's " + count + "'th comment! Go check it out!",
                };
            }
            
            message.To.Add(recipient);
            client.Send(message);
        }
    }
}
