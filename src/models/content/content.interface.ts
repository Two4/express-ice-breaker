import {IUser} from "../user/user.interface";
import {ObjectId} from "mongodb";
import {IVote, IVoteCount} from "./vote/vote.interface";
import {IComment, ICommentModel} from "./comment/comment.interface";

export interface IContentBase {
    author: IUser
}

export interface IContentModel extends IContentBase {
    _id: ObjectId | undefined
    timestampUTC: number
    votes: IVote[]
    comments: ICommentModel[]
}

export interface IContent extends IContentBase {
    _id: ObjectId | undefined
    timestampUTC: number
    voteCount: IVoteCount
    comments: IComment[]
}
