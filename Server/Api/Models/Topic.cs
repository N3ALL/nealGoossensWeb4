using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Api;


public class Topic 
{
    private string _title;
    private string _description;
    private User _user;
    #region properties
    public int ID { get; }
    public String title
    {
        get { return _title; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("User is required");
            }
            else _title = value;
        }
    }
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
    
    public StatusTopic status { get; set; }
    public User user {
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
    public ICollection<Reply> replies { get; set; }
    #endregion
    public Topic()
    {

    }
    public Topic(String title, String description, StatusTopic status, User poster, DateTime dateOfCreation)
	{
        this.title = title;
        this.description = description;
        this.dateOfCreation = dateOfCreation ;
        
        this.status = status;
        this.user = poster;
        this.replies = new List<Reply>();
	}
    private string DateConversion(DateTime date)
    {
        return date.ToString("yyyy-MM-ddTHH:mm:ss");
    }
}

