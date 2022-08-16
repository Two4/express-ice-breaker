import {User} from "../../user/user.interface";
import {Content, ContentBase} from "./content.interface";
import {Vote} from "./vote";
import {ObjectId} from "mongodb";

export interface CommentBase extends ContentBase {
    postId: string
    parentCommentId: string | null
    text: string
}


export class Comment implements Content, CommentBase {
    childrenIds: string[];
    author: User;
    id: ObjectId;
    parentCommentId: string;
    postId: string;
    text: string;
    timestamp: number;
    votes: Vote[];


    constructor(childrenIds: string[], author: User, id: ObjectId, parentCommentId: string, postId: string, text: string, timestamp: number, votes: []) {
        this.childrenIds = childrenIds;
        this.author = author;
        this.id = id;
        this.parentCommentId = parentCommentId;
        this.postId = postId;
        this.text = text;
        this.timestamp = timestamp;
        this.votes = votes;
    }
}