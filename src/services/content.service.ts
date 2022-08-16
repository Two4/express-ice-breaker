import {UserBase} from "../user/user.interface";
import {Post, PostBase} from "../models/content/post";
import {Comment, CommentBase} from "../models/content/comment";

export class DeleteResult {
    success: boolean
    message: string
    timestampUTC: number

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
        this.timestampUTC = (new Date()).getTime();
    }
}

//Create
export const createPost = async (post: PostBase): Promise<Post> => {/*TODO*/}
export const createComment = async (comment: CommentBase): Promise<Comment> => {/*TODO*/}

//Read
export const getPost = async (postId: string): Promise<Post> => {/*TODO*/}
export const getComment = async (commentId: string): Promise<Comment> => {/*TODO*/}
    // User content
export const getUserPosts = async(user: UserBase): Promise<Post[]> => {/*TODO*/}
export const getUserComments = async(user: UserBase): Promise<Comment[]> => {/*TODO*/}

//Update
export const updatePost = async (post: Post): Promise<Post> => {/*TODO*/}
export const updateComment = async (comment: Comment): Promise<Comment> => {/*TODO*/}

//Delete
export const deletePost = async (postId: string): Promise<DeleteResult> => {/*TODO*/}
export const deleteComment = async (commentId: string): Promise<DeleteResult> => {/*TODO*/}
