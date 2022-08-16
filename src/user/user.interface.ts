import {ObjectId} from "mongodb";

export interface UserBase {
    name: string
}

export class User implements UserBase{
    name: string;
    id: ObjectId
    creationTimestampUTC: number


    constructor(name: string, id: ObjectId, creationTimestampUTC: number) {
        this.name = name;
        this.id = id;
        this.creationTimestampUTC = creationTimestampUTC;
    }
}