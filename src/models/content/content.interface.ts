import {User} from "../../user/user.interface";
import {Vote} from "./vote";
import {ObjectId} from "mongodb";

export interface ContentBase {
    author: User
}

export interface Content extends ContentBase {
    id: ObjectId
    votes: Vote[]
    timestamp: number
}
