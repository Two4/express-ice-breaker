import {IContent, IContentBase, IContentModel} from "../content.interface";

export interface IPostBase extends IContentBase{
    link: string
}

export interface IPostModel extends IContentModel, IPostBase {
    toPost(): IPost
}

export interface IPost extends IPostBase, IContent {}