import {Content, ContentBase} from "./content.interface";
import {User} from "../../user/user.interface";
import {Vote} from "./vote";
import {ObjectId} from "mongodb";

export interface PostBase extends ContentBase{
    link: string
}

export class Post implements Content, PostBase {
    author: User;
    id: ObjectId;
    link: string;
    timestamp: number;
    votes: Vote[];

    constructor(author: User, id: ObjectId, link: string, timestamp: number, votes: Vote[]) {
        this.author = author;
        this.id = id;
        this.link = link;
        this.timestamp = timestamp;
        this.votes = votes;
    }
}
