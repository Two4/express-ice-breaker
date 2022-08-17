import {ObjectId} from "mongodb";

export interface IUserBase {
    _id: ObjectId
}

export interface IUserReq extends IUserBase {
    password: string
}

export interface IUser extends IUserBase{
    creationTimestampUTC: number
}

export interface IUserRecord extends IUser{
    hash: string
}