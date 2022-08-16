import {ObjectId} from "mongodb";

export class Vote {
    contentId: ObjectId
    voter: string
    up: boolean
    timestampUTC: number | null


    constructor(contentId: ObjectId, voter: string, up: boolean, timestampUTC: number) {
        this.contentId = contentId;
        this.voter = voter;
        this.up = up;
        this.timestampUTC = timestampUTC;
    }
}