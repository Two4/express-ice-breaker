import {IUser} from "../../user/user.interface";
import {ObjectId} from "mongodb";
import {IComment, ICommentModel} from "./comment.interface";
import {IVote, IVoteCount} from "../vote/vote.interface";
import {VoteCount} from "../vote/vote";

export class CommentModel implements ICommentModel {
    _id: ObjectId | undefined;
    author: IUser;
    postId: string;
    parentId: string | undefined;
    text: string;
    timestampUTC: number;
    votes: IVote[];
    comments: ICommentModel[];

    constructor(id: ObjectId | undefined, author: IUser, postId: string, parentId: string | undefined, text: string, timestamp: number, votes: IVote[], comments: ICommentModel[]) {
        this._id = id;
        this.author = author;
        this.postId = postId;
        this.parentId = parentId;
        this.text = text;
        this.timestampUTC = timestamp;
        this.votes = votes;
        this.comments = comments;
    }

    toComment(): IComment {
        const comments: IComment[] = [];
        for (let commentModel of this.comments) {
            comments.push(commentModel.toComment())
        }
        const upvotes = this.votes.filter(value => value.up).length;
        const downvotes = this.votes.length - upvotes;
        return new Comment(this.author, this._id, this.postId, this.parentId, this.text, this.timestampUTC, new VoteCount(downvotes, upvotes), comments);
    }
}

export class Comment implements IComment {
    author: IUser;
    _id: ObjectId | undefined;
    postId: string;
    parentId: string | undefined;
    text: string;
    timestampUTC: number;
    voteCount: IVoteCount;
    comments: IComment[];

    constructor(author: IUser, id: ObjectId | undefined, postId: string, parentId: string | undefined, text: string, timestamp: number, voteCount: IVoteCount, comments: IComment[]) {
        this.author = author;
        this._id = id;
        this.postId = postId;
        this.parentId = parentId;
        this.text = text;
        this.timestampUTC = timestamp;
        this.voteCount = voteCount;
        this.comments = comments;
    }
}