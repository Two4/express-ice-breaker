import {IComment, ICommentBase, ICommentModel} from "../models/content/comment/comment.interface";
import {Collection, ObjectId} from "mongodb";
import {CommentModel} from "../models/content/comment/comment.model";
import {v5 as uuid} from "uuid";
import {IContentModel} from "../models/content/content.interface";

//Create
export const createComment = async (commentBase: ICommentBase, contentCollection: Collection<IContentModel>): Promise<IComment> => {
    const timestamp = (new Date()).getTime()
    const id = new ObjectId(uuid(timestamp.toString(), commentBase.author._id.toString()))
    const commentModel = new CommentModel(id, commentBase.author, commentBase.postId, commentBase.parentId, commentBase.text, timestamp, [], [])
    const result = await contentCollection.insertOne(commentModel)
    if (result) {
        return commentModel.toComment()
    } else {
        throw new Error('failed to insert comment');
    }
}

//Read
export const getUserComments= async (userId: string, contentCollection: Collection<IContentModel>): Promise<IComment[]> => {
    const comments: IComment[] = [];

    const result = await contentCollection.find({
        postId: { $exists: true },
        author: { _id: userId }
    }).toArray();

    for (let doc of result) {
        const commentModel = doc as unknown as ICommentModel;
        const comment = commentModel.toComment();
        comments.push(comment)
    }

    return comments;
}

//Update
export const updateComment = async (commentModel: ICommentModel, contentCollection: Collection<IContentModel>): Promise<IComment> => {
    const result = await contentCollection.findOneAndUpdate({ _id: commentModel._id }, { text: { $set: commentModel.text }});
    if (result.ok) {
        const updatedCommentModel = result as unknown as ICommentModel;
        return updatedCommentModel.toComment();
    } else {
        throw new Error(`Could not update comment ${commentModel._id}: ${result.lastErrorObject}`);
    }
}

//Delete
export const deleteComment = async (commentId: string, contentCollection: Collection<IContentModel>): Promise<boolean> => {
    const result = await contentCollection.deleteOne({_id: new ObjectId(commentId)});
    if (result) {
        return true;
    } else {
        throw new Error(`Could not delete comment ${commentId}`);
    }
}
