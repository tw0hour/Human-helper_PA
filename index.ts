import {config} from 'dotenv';
config();
import express, {Express} from "express";
import bodyParser from "body-parser";

import {SequelizeManager} from "./models";
import {buildRoutes} from "./routes";

const app: Express = express();

async function main(){
    const sequelize = await SequelizeManager.getInstance();
    console.log(sequelize);
}
main().then(function (){});

app.use(bodyParser.json());

buildRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Listening on ${port}...`);
});
