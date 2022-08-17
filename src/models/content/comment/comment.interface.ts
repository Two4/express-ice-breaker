import {IContent, IContentBase, IContentModel} from "../content.interface";

export interface ICommentBase extends IContentBase {
    postId: string
    parentId: string | undefined
    text: string
}

export interface ICommentModel extends ICommentBase, IContentModel {
    toComment(): IComment
}

export interface ITreeCommentModel extends ICommentModel {
    depth: number
}

export interface IComment extends ICommentBase, IContent {}