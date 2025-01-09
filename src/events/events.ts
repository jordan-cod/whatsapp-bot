import { EventEmitter } from "node:stream";
import { Message } from "whatsapp-web.js";

class BotEvents extends EventEmitter {
    private static instance: BotEvents;

    private constructor() {
        super();
    }

    static getInstance(): BotEvents {
        if (!BotEvents.instance) {
            BotEvents.instance = new BotEvents();
        }
        return BotEvents.instance;
    }

    messageReceived(message: Message): void {
        this.emit("message_received", message);
    }

    sendMessage(to: string, message: string): void {
        this.emit("message_send", to, message);
    }
}

export const botEvents = BotEvents.getInstance();
