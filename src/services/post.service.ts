import {IPost, IPostBase, IPostModel} from "../models/content/post/post.interface";
import {Collection, ObjectId} from "mongodb";
import {PostModel} from "../models/content/post/post.model";
import {v5 as uuid} from "uuid"
import {ICommentModel} from "../models/content/comment/comment.interface";
import {IContentModel} from "../models/content/content.interface";

//Create
export const createPost = async (postBase: IPostBase, contentCollection: Collection<IContentModel>): Promise<IPost> => {
    const timestamp = (new Date()).getTime();
    const id = new ObjectId(uuid(timestamp.toString(), postBase.author._id.toString()));
    const postModel = new PostModel(new ObjectId(id), postBase.author, postBase.link, timestamp, [], []);
    const result = await contentCollection.insertOne(postModel);
    if (result) {
        return postModel.toPost();
    } else {
        throw new Error('failed to insert post');
    }
}

//Read
export const getPost = async (postId: string, contentCollection: Collection<IContentModel>): Promise<IPost> => {
    const result = await contentCollection.aggregate([
        {
            $match: {
                _id: new ObjectId(postId)
            }
        },
        {
            $lookup: {
                from: contentCollection.collectionName,
                localField: "_id",
                foreignField: "postId",
                as: "comments"
            }
        },
        {
            $limit: 1
        }
    ]).next()

    const postModel = result as IPostModel;

    //Transform comments to tree structure
    const modelsById = new Map<string, ICommentModel>;
    const reverseLookup = new Map<string, string[]>();

    for (let commentModel of postModel.comments) {
        if (!commentModel._id) {
            continue;
        }
        modelsById.set(commentModel._id.toString(), commentModel)
        if (commentModel.parentId) {
            if (!reverseLookup.has(commentModel.parentId)) {
                reverseLookup.set(commentModel.parentId, []);
            }
            // @ts-ignore
            reverseLookup.get(elem.parentId.toString()).push(commentModel._id.toString());
        }
    }

    for (let key of reverseLookup.keys()) {
        const values = reverseLookup.get(key);
        // @ts-ignore
        for (let value of values) {
            // @ts-ignore
            modelsById.get(key).comments.push(modelsById.get(value));
        }
    }

    postModel.comments = Array.from(modelsById.values()).filter(value => value.parentId === null)

    return postModel.toPost()
}

export const getUserPosts = async (userId: string, contentCollection: Collection<IContentModel>): Promise<IPost[]> => {
    const result = await contentCollection.find({
        author: {
            _id: new ObjectId(userId)
        },
        postId: { $exists: false }
    }).toArray();

    const posts: IPost[] = [];

    for (let doc of result) {
        const postModel = doc as IPostModel;
        posts.push(postModel.toPost());
    }

    return posts;
}

export const getUserVotedPosts = async (userId: string, contentCollection: Collection<IContentModel>): Promise<IPost[]> => {
    const result = await contentCollection.find({ votes: { $elemMatch: { voter: userId } } }).toArray();

    const posts: IPost[] = [];

    for (let elem of result) {
        const postModel = elem as IPostModel;
        posts.push(postModel.toPost());
    }

    return posts;
}

//Update
export const updatePost = async (updatedPostModel: IPostModel, contentCollection: Collection<IContentModel>): Promise<IPost> => {
    const result = await contentCollection.findOneAndUpdate({ _id: updatedPostModel._id }, { link: updatedPostModel.link });

    if (result.ok) {
        return (result.value as IPostModel).toPost();
    } else {
        throw new Error(`unable to update post ${updatedPostModel._id}: ${result.lastErrorObject}`);
    }
}

//Delete
export const deletePost = async (postId: string, contentCollection: Collection<IContentModel>): Promise<boolean> => {
    const result = await contentCollection.deleteOne({ _id: new ObjectId(postId) });
    if (result) {
        return true;
    } else {
        throw new Error(`Unable to delete post ${postId}`);
    }
}