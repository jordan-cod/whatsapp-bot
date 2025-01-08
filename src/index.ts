import "dotenv/config";

import app from "./apps/api";
import { WhatsAppBot } from "./apps/bot";

import "./handlers/message";
// import { database } from "./database/config/database";

async function start() {
    // await database.connect();
    await WhatsAppBot.getInstance().init();

    app.listen(process.env.PORT || 8081, () => {
        console.log(
            `[API] Server is running on port ${process.env.PORT || 8081}`
        );
    });
}

start();
