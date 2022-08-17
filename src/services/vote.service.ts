import {Collection, ObjectId} from "mongodb";
import {IContentModel} from "../models/content/content.interface";
import {IVote} from "../models/content/vote/vote.interface";

export const castVote = async (vote: IVote, contentCollection: Collection<IContentModel>): Promise<IContentModel> => {
    const result = await contentCollection.findOneAndUpdate({_id: new ObjectId(vote.contentId)},
        {$push: {votes: vote}});
    if (result.ok && result.value !== null) {
        return result.value;
    } else {
        throw new Error(`Could not cast vote for content ${vote.contentId}: ${result.lastErrorObject}`);
    }
}