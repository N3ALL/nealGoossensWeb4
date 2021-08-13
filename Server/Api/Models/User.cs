using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Api;

public class User
{
    private string _username;
    private string _name;
    private string _surname;
    private string _emailAdress;

    #region properties
    public int ID { get; }
    public String surname
    {
        get { return _surname; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("Surname is required");
            }
            else _surname = value;
        }
    }
    public String name { 
        get { return _name; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("Name is required");
            }
            else _name = value;
        }
    }
    public String username {
        get { return _username; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("Username is required");
            }
            else _username = value;
        }
    }
    
    public String emailAdress {
        get { return _emailAdress; }
        set
        {
            if (value == null || value.Equals(""))
            {
                throw new ArgumentException("Email is required");
            }
            else _emailAdress = value;
        }
    }
    public String institution { get; set; } 
    public String fieldOfStudy { get; set; }  
    public StatusUser status { get; set; }
    public DateTime dateOfRegistration { get; set; }
    [JsonIgnore]
    public ICollection<Topic> userTopics { get; private set; }
    [JsonIgnore]
    public ICollection<Reply> userReplies { get; private set; }
    #endregion

    
    #region constructor
    public User()
    {

    }
    public User(String surname, String name, String username, String emailAdress, String institution, String fieldOfStudy, StatusUser status, DateTime dateOfRegistration)
	{
        this.surname = surname;
        this.name = name;
        this.username = username;
        
        this.emailAdress = emailAdress;
        this.institution = institution;
        this.fieldOfStudy = fieldOfStudy;
        this.dateOfRegistration = dateOfRegistration;
        this.status = status;
	}


    #endregion

    #region methods
    
    internal void editProfile(string username, string firstName, string lastName, string institution, string fieldOfStudy)
    {
        this.username = username;
        this.name = lastName;
        this.fieldOfStudy = fieldOfStudy;
        this.institution = institution;
        this.surname = firstName;
    }
    #endregion
}
