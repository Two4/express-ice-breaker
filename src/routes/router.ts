import express from "express";
import {ICommentBase, ICommentModel} from "../models/content/comment/comment.interface";
import {createComment, deleteComment, getUserComments, updateComment} from "../services/comment.service";
import {collections} from "../services/mongo.service";
import {IUserReq} from "../models/user/user.interface";
import {createUser, getUserRecord} from "../services/user.service";
import {UserRecord} from "../models/user/user";
import {createPost, deletePost, getPost, getUserPosts, getUserVotedPosts, updatePost} from "../services/post.service";
import {IPostBase, IPostModel} from "../models/content/post/post.interface";
import bcrypt = require("bcrypt")

export const router = express.Router();

router.use(express.json);

router.get("/healthcheck", (_req, res) => {
    res.status(200).json("OK");
});

router.post("/comment/create", async (req, res) => {
    try {
        const commentReq = req.body as ICommentBase;
        const commentRes = await createComment(commentReq, collections.content);
        res.status(200).json(commentRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Could not create comment");
    }
});

router.get("/user/:userId/comments", async (req, res) => {
    try {
        const userComments = await getUserComments(req.params.userId, collections.content);
        res.status(200).send(userComments);
    } catch (e) {
        console.log(e);
        res.status(404).send(`Could not retrieve comments for user ${req.params.userId}`);
    }
});

router.put("/comment/update", async (req, res) => {
    try {
        const updateReq = req.body as ICommentModel;
        const updateRes = await updateComment(updateReq, collections.content);
        res.status(200).send(updateRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Could not update comment");
    }
});

router.delete("/comment/:commentId/delete", async (req, res) => {
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
});

router.post("/user/create", async (req, res) => {
    try {
        const createReq = req.body as IUserReq;
        const createRes = await createUser(new UserRecord(createReq._id,
            (new Date()).getTime(),
            await bcrypt.hash(createReq.password, 10)), collections.users);
        res.status(200).send(createRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Unable to create user");
    }
});

router.get("/login", async (req, res) => {
    try {
        const loginReq = req.body as IUserReq;
        const userRecord = await getUserRecord({_id: loginReq._id}, collections.users);
        if (await bcrypt.compare(loginReq.password, userRecord.hash)) {
            res.status(200).send(); //TODO JWT middleware
        } else {
            res.status(401).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post("/post/create", async (req, res) => {
    try {
        const createRes = await createPost(req.body as IPostBase, collections.content);
        res.status(200).send(createRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Unable to create post");
    }
})

router.get("/post/:postId", async (req, res) => {
    try {
        const getRes = await getPost(req.params.postId, collections.content);
        res.status(200).send(getRes);
    } catch (e) {
        console.log(e);
        res.status(404).send(`Unable to get post ${req.params.postId}`);
    }
});

router.get("/user/:userId/posts", async (req, res) => {
    try {
        const getRes = await getUserPosts(req.params.userId, collections.content);
        res.status(200).send(getRes);
    } catch (e) {
        console.log(e);
        res.status(404).send()
    }
});

router.get("/user/:userId/voted", async (req, res) => {
    try {
        const getRes = await getUserVotedPosts(req.params.userId, collections.content);
        res.status(200).send(getRes);
    } catch (e) {
        console.log(e);
        res.status(404).send(`Unable to get voted posts for user ${req.params.userId}`);
    }
});

router.put("/post/update", async (req, res) => {
    try {
        const putRes = await updatePost(req.body as IPostModel, collections.content);
        res.status(200).send(putRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Unable to update post");
    }
});

router.delete("/post/:postId/delete", async (req, res) => {
    try {
        if (await deletePost(req.params.postId, collections.content)) {
            res.status(204).send();
        } else {
            res.status(500).send(`Unable to delete post ${req.params.postId}`);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Unable to delete post ${req.params.postId}`);
    }
});