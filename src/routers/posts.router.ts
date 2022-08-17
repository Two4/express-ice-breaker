import express from "express";
import {createPost, deletePost, getPost, getUserPosts, getUserVotedPosts, updatePost} from "../services/post.service";
import {IPostBase, IPostModel} from "../models/content/post/post.interface";
import {collections} from "../services/mongo.service";

export const postsRouter = express.Router();

postsRouter.use(express.json);

postsRouter.post("post/create", async (req, res) => {
    try {
        const createRes = await createPost(req.body as IPostBase, collections.content);
        res.status(200).send(createRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Unable to create post");
    }
})

postsRouter.get("post/:postId", async (req, res) => {
    try {
        const getRes = await getPost(req.params.postId, collections.content);
        res.status(200).send(getRes);
    } catch (e) {
        console.log(e);
        res.status(404).send(`Unable to get post ${req.params.postId}`);
    }
})

postsRouter.get("user/:userId/posts", async (req, res) => {
    try {
        const getRes = await getUserPosts(req.params.userId, collections.content);
        res.status(200).send(getRes);
    } catch (e) {
        console.log(e);
        res.status(404).send()
    }
})

postsRouter.get("user/:userId/voted", async (req, res) => {
    try {
        const getRes = await getUserVotedPosts(req.params.userId, collections.content);
        res.status(200).send(getRes);
    } catch (e) {
        console.log(e);
        res.status(404).send(`Unable to get voted posts for user ${req.params.userId}`);
    }
})

postsRouter.put("post/update", async (req, res) => {
    try {
        const putRes = await updatePost(req.body as IPostModel, collections.content);
        res.status(200).send(putRes);
    } catch (e) {
        console.log(e);
        res.status(400).send("Unable to update post");
    }
})

postsRouter.delete("post/:postId/delete", async (req, res) => {
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
})