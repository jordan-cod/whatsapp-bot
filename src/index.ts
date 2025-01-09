import "dotenv/config";

import { WhatsAppBot } from "./apps/bot";

import "./handlers/message";
import startServer from "./apps/api";
// import { database } from "./database/config/database";

async function start() {
    // await database.connect();
    await WhatsAppBot.getInstance().init();

    startServer();
}

start();
