import {ObjectId} from "mongodb";
import {IUser, IUserRecord} from "./user.interface";

export class User implements IUser {
    _id: ObjectId;
    creationTimestampUTC: number;

    constructor(id: ObjectId, creationTimestampUTC: number) {
        this._id = id;
        this.creationTimestampUTC = creationTimestampUTC;
    }
}

export class UserRecord implements IUserRecord {
    _id: ObjectId;
    creationTimestampUTC: number;
    hash: string;

    constructor(id: ObjectId, creationTimestampUTC: number, hash: string) {
        this._id = id;
        this.creationTimestampUTC = creationTimestampUTC;
        this.hash = hash;
    }
}