interface ProfileJson{
   id: number,
   surname: string,
   name: string,
   username: string,
   email: string,
   institution: string,
   fieldOfStudy: string,
   statusUser: string,
   dateCreated: string;
}



export class Profile{
    private _id: number;
    private _surname: string;
    private _name: string;
    private _username: string;
    private _email: string;
    private _institution: string; //not obligated
    private _fieldOfStudy: string;  //not obligated
    private _statusUser: string
    private _dateCreated: Date;

    /* 
    public ICollection<Topic> userTopics { get; private set; }
    public ICollection<Reply> userReplies { get; private set; }
    */

    constructor(id: number, surname: string, name: string, username: string, email: string, institution: string, fieldOfStudy: string, statusUser: string, dateCreated: string){
        this._id = id;
        this._surname= surname;
        this._name = name;
        this._username = username;
        this._email = email;
        this._institution = institution;
        this._fieldOfStudy = fieldOfStudy;
        this._statusUser = statusUser;
        this._dateCreated = new Date(dateCreated);
    }
     get id(){
        return this._id;
     }
     get surname(){
        return this._surname;
     }
     get name(){
        return this._name;
     }
     get username(){
        return this._username;
     }
     get emailAdress(){
        return this._email;
     }
     get institution(){
        return this._institution;
     }
     get fieldOfStudy(){
        return this._fieldOfStudy;
     }
     get statusUser(){
        return this._statusUser;
     }
     get dateOfRegistration(){
        return this._dateCreated;
     }

     static fromJSON(json: ProfileJson): Profile {
      const profile = new Profile(
       json.id,
       json.surname,
       json.name,
       json.username,
       json.email,
       json.institution,
       json.fieldOfStudy,
       json.statusUser,
       json.dateCreated
      );
      return profile;
  }
}


