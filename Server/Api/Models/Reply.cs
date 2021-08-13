using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Api;

public class Reply
{
    private string _description;
    private User _user;
    private Topic _topic;

    #region properties
    public int ID { get; }
    public String description {
        get { return _description; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("Description is required");
            }
            else _description = value;
        }
    }
    public DateTime dateOfCreation { get; set; }
    public StatusReply status { get; set; }
    public User user
    {
        get { return _user; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("User is required");
            }
            else _user = value;
        }
    }
    [JsonIgnore]
    public Topic topic {
        get { return _topic; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("Topic is required");
            }
            else _topic = value;
        }
    }
    #endregion

    #region constructor
    public Reply()
    {

    }
    public Reply(String description, StatusReply status, User user, Topic topic)
	{
        dateOfCreation = DateTime.Now;
        this.description = description;
        this.status = status;
        this.user = user;
        this.topic = topic;
	}
    #endregion
}
