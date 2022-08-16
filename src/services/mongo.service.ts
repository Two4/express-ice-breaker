import * as dotenv from "dotenv"
import {Collection, Db, MongoClient} from "mongodb";

export interface Collections {
    users: Collection | null
    content: Collection | null
}

export var collections: Collections = {users: null, content: null}

export const mongoConnect = async () => {
    dotenv.config();
    const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING ?? 'undefined db url string')
    await client.connect()
    const db: Db = client.db(process.env.DB_NAME ?? 'undefined db name')
    collections = {
        users: db.collection(process.env.USER_COLLECTION_NAME ?? 'undefined user collection name'),
        content: db.collection(process.env.CONTENT_COLLECTION_NAME ?? 'undefined content collection name')
    }
}