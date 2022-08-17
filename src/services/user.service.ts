import {IUser, IUserBase, IUserRecord} from "../models/user/user.interface";
import {Collection} from "mongodb";

//Create
export const createUser = async (user: IUserRecord, userCollection: Collection<IUserRecord>): Promise<IUser> => {
    const result = await userCollection.insertOne(user);
    if (result) {
        return await getUser(user as IUserBase, userCollection);
    } else {
        throw new Error(`Could not create user ${user._id}`);
    }
}

//Read
export const getUser = async (user: IUserBase, userCollection: Collection<IUserRecord>): Promise<IUser> => {
    const result = await userCollection.aggregate([
        {
            $match: { _id: user._id }
        },
        {
            $project: {
                _id: true,
                creationTimestampUTC: true,
                hash: false
            }
        },
        {
            $limit: 1
        }
    ]).next();

    if (result) {
        return result as IUser;
    } else {
        throw new Error(`Could not get user ${user._id}`)
    }
}

export const getUserRecord = async (user: IUserBase, userCollection: Collection<IUserRecord>): Promise<IUserRecord> => {
    const result = await userCollection.findOne({ _id: user._id })
    if (result) {
        return result;
    } else {
        throw new Error(`Could not get user record ${user._id}`)
    }
}