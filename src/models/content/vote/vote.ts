import {IVote, IVoteCount} from "./vote.interface";

export class Vote implements IVote {
    contentId: string
    voter: string
    up: boolean
    timestampUTC: number | null


    constructor(contentId: string, voter: string, up: boolean, timestampUTC: number | null) {
        this.contentId = contentId;
        this.voter = voter;
        this.up = up;
        this.timestampUTC = timestampUTC;
    }
}

export class VoteCount implements IVoteCount {
    downvotes: number;
    upvotes: number;

    constructor(downvotes: number, upvotes: number) {
        this.downvotes = downvotes;
        this.upvotes = upvotes;
    }
}