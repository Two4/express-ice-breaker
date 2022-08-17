import express from "express";
import {ICommentBase, ICommentModel} from "../models/content/comment/comment.interface";
import {createComment, deleteComment, getUserComments, updateComment} from "../services/comment.service";
import {collections} from "../services/mongo.service";

export const commentsRouter = express.Router()

commentsRouter.use(express.json());

commentsRouter.post("comment/create", async (req, res) => {
    try {
        const commentReq = req.body as ICommentBase;
        const commentRes = await createComment(commentReq, collections.content);
        res.status(200).send(commentRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Could not create comment");
    }
})

commentsRouter.get("user/:userId/comments", async (req, res) => {
    try {
        const userComments = await getUserComments(req.params.userId, collections.content);
        res.status(200).send(userComments);
    } catch (e) {
        console.log(e);
        res.status(404).send(`Could not retrieve comments for user ${req.params.userId}`);
    }
})

commentsRouter.put("comment/update", async (req, res) => {
    try {
        const updateReq = req.body as ICommentModel;
        const updateRes = await updateComment(updateReq, collections.content);
        res.status(200).send(updateRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Could not update comment");
    }
})

commentsRouter.delete("comment/:commentId/delete", async (req, res) => {
    try {
        if (await deleteComment(req.params.commentId, collections.content)) {
            res.status(204).send();
        } else {
            res.status(500).send(`Unable to delete comment ${req.params.commentId}`);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Unable to delete comment ${req.params.commentId}`);
    }
})