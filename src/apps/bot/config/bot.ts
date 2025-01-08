import path from "path";
import { LocalAuth } from "whatsapp-web.js";

const session = process.env.BOT_SESSION as string;

export const config = {
    settings: {
        authStrategy: new LocalAuth({
            clientId: session || "default",
            dataPath: path.resolve(__dirname, "../sessions")
        })
    }
};
