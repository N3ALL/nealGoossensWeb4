using System;

using Api;
public class Category
{
    #region properties
    public int ID { get; }
    public String name { get; set; }
    public String description { get; set; }

    #endregion
    public Category(String name, String description)
	{
        this.name = name;
        this.description = description;
	}
}
