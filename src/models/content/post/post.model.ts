import {IUser} from "../../user/user.interface";
import {ObjectId} from "mongodb";
import {IPost, IPostModel} from "./post.interface";
import {IComment, ICommentModel} from "../comment/comment.interface";
import {IVote, IVoteCount} from "../vote/vote.interface";
import {VoteCount} from "../vote/vote";

export class PostModel implements IPostModel {
    _id: ObjectId | undefined;
    author: IUser;
    link: string;
    timestampUTC: number;
    votes: IVote[];
    comments: ICommentModel[];

    constructor(id: ObjectId | undefined, author: IUser, link: string, timestamp: number, votes: IVote[], comments: ICommentModel[]) {
        this._id = id;
        this.author = author;
        this.link = link;
        this.timestampUTC = timestamp;
        this.votes = votes;
        this.comments = comments;
    }

    toPost(): IPost {
        const comments: IComment[] = [];
        for (let commentModel of this.comments) {
            comments.push(commentModel.toComment())
        }
        const upvotes = this.votes.filter(value => value.up).length;
        const downvotes = this.votes.length - upvotes;

        return new Post(this.author, this._id, this.link, this.timestampUTC, new VoteCount(downvotes, upvotes), comments)
    }

}

export class Post implements IPost {
    author: IUser;
    _id: ObjectId | undefined;
    link: string;
    timestampUTC: number;
    voteCount: IVoteCount;
    comments: IComment[];

    constructor(author: IUser, id: ObjectId | undefined, link: string, timestamp: number, voteCount: IVoteCount, comments: IComment[]) {
        this.author = author;
        this._id = id;
        this.link = link;
        this.timestampUTC = timestamp;
        this.voteCount = voteCount;
        this.comments = comments;
    }
}
