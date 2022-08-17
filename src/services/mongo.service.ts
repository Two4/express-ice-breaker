import * as dotenv from "dotenv"
import {Collection, MongoClient} from "mongodb";
import {IContentModel} from "../models/content/content.interface";
import {IUserRecord} from "../models/user/user.interface";

export interface Collections {
    users: Collection<IUserRecord>;
    content: Collection<IContentModel>;
}

export var collections: Collections;

export const mongoConnect = async () => {
    dotenv.config();
    const client = new MongoClient(process.env.DB_CONN_STRING ?? 'undefined db url string')
    await client.connect()
    const db = client.db(process.env.DB_NAME ?? 'undefined db name')
    collections = {
        content: db.collection(process.env.CONTENT_COLLECTION_NAME ?? 'undefined content collection name'),
        users: db.collection(process.env.USER_COLLECTION_NAME ?? 'undefined user collection name')
    }
}