import { Topic } from "./topic.model";


export interface ReplyJson{
    id: number;
    description: string;
    dateOfCreation: string;
    status: number;
    user: string;
}
export class Reply{
    private _id: number;
    private _description: string;
    private _dateOfCreation: Date;
    private _status: number;
    private _user: string;
    

    constructor(id: number, description: string, dateOfCreation: string, status: number, user: string, ){
        this._id = id;
        this._description = description;
        this._dateOfCreation = new Date(dateOfCreation);
        this._status = status;
        this._user = user;
       
    }

    get id(): number{
        return this._id;
    }
    get description(): string{
        return this._description;
    }
    get dateOfCreation(): Date{
        return this._dateOfCreation
    }
    get status(): number{
        return this._status;
    }
    get user(): string{
        return this._user;
    }

    static fromJSON(json: ReplyJson): Reply {
       const reply = new Reply(
        json.id,
        json.description,
        json.dateOfCreation,
        json.status,
        json.user,
       );
       return reply;
   }

   toJSON(): ReplyJson {
    return <ReplyJson>{
      description: this.description,
    };
  }


}