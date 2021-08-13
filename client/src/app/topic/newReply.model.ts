export interface newReplyJson{
    id: number;
    description: string;
}


export class newReply{
    private _id: number;
    private _description: string;
    
    

    constructor(id: number, description: string){
        this._id = id;
        this._description = description;
    }

    get id(): number{
        return this._id;
    }
    get description(): string{
        return this._description;
    }
    

   toJSON(): newReplyJson {
    return <newReplyJson>{
    id: this.id,
    description: this.description,
    };
  }


}