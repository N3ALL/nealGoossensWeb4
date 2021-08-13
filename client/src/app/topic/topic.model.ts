import { Profile } from "../profile/profile.model";
import { Reply, ReplyJson } from "../topic/reply.model"

interface TopicJson {
    title: string;
    description: string;
    numberOfReplies: number;
    status: string;
    dateOfCreation: string;
    user: string;
    id: number;
    //userReplies: ReplyJson[],
}



export class Topic{
    private _title: string;
    private _description: string;
    private _numberOfReplies: number;
    private _status: string;
    private _postedBy: string;
    private _dateOfCreation: Date;
    private _id: number;
    //private _replies = new Array<Reply>()

   constructor (title: string, description: string, numberOfReplies: number, status: string, postedBy: string, dateOfCreation: string, id: number){
       this._title = title;
       this._description = description;
       this._numberOfReplies = numberOfReplies;
       this._status = status;
       this._postedBy = postedBy;
       this._dateOfCreation = new Date(dateOfCreation);
       this._id = id;
    
       
   }

   get title(): string{
       return this._title;
   }
   get description(): string{
       return this._description;
   }
   get numberOfViews(): number{
       return this._numberOfReplies;
   }
   get status(): string{
       return this._status;
   }
   get postedBy(): string{
       return this._postedBy;
   }
   get dateOfCreation(): Date {
       return this._dateOfCreation;
   }
   get id(): number{
       return this._id;
   }

   static fromJSON(json: TopicJson): Topic {
    
       const topic = new Topic(
        json.title,
        json.description,
        json.numberOfReplies,
        json.status,
        json.user,
        json.dateOfCreation,
        json.id,
       
       );
    
       return topic;
   }
   toJSON(): TopicJson {
    return <TopicJson>{
        title: this.title,
        description: this.description,
    };
  }
   


    
}