import express from "express";
import {IUserReq} from "../models/user/user.interface";
import {createUser, getUserRecord} from "../services/user.service";
import {collections} from "../services/mongo.service";
import bcrypt = require("bcrypt")
import {UserRecord} from "../models/user/user";

export const usersRouter = express.Router()

usersRouter.use(express.json);

usersRouter.post("user/create", async (req, res) => {
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
})

usersRouter.get("login", async (req, res) => {
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
})

