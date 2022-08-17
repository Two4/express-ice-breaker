import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {mongoConnect} from "./services/mongo.service";
import morgan from "morgan";
import {router} from "./routes/router";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

mongoConnect()
    .then()
    .catch((e: Error) => {
    console.error(e);
    process.exit(1);
})

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/", router);
app.use("/*", (req, res) => { res.send(`unknown path ${req.path}`) });

app.listen(PORT, "localhost", () => {
    console.log(`Listening on port ${PORT}`);
});


