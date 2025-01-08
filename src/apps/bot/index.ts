import { config } from "./config/bot";
import { Client, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { botEvents } from "@/events/events";

export class WhatsAppBot {
    private static instance: WhatsAppBot | undefined;
    private client: Client | undefined;
    private session: string | undefined;

    public static getInstance(): WhatsAppBot {
        if (WhatsAppBot.instance === undefined)
            WhatsAppBot.instance = new WhatsAppBot();
        return WhatsAppBot.instance;
    }

    public getSession(): string {
        if (!this.session) {
            throw new Error("[BOT] Session not started.");
        }
        return this.session;
    }

    public async init(): Promise<this> {
        this.client = new Client(config.settings);

        this.client.on("qr", (qr) => {
            console.log("[BOT] QR Code received, scan with WhatsApp:");
            qrcode.generate(qr, { small: true });
        });

        this.client.on("authenticated", () => {
            console.log("[BOT] Client authenticated!");
        });

        this.client.on("disconnected", (reason) => {
            console.log("[BOT] Client disconnected:", reason);
            this.client?.initialize();
        });

        this.client.on("ready", () => {
            console.log("[BOT] Client is ready!");
            this.setupListeners();
        });

        await this.client.initialize();

        return this;
    }

    private setupListeners(): void {
        if (!this.client)
            throw new Error("[BOT] WhatsApp Client not initialized.");

        this.client.on("message", async (message: Message) => {
            botEvents.messageReceived(message);
        });

        process.on("SIGINT", () => {
            console.log("[BOT] Shutting down WhatsApp session...");
            this.client?.destroy();
        });
    }

    public async sendMessage(to: string, message: string): Promise<void> {
        if (!this.client) throw new Error("[BOT] WhatsappBot not initialized.");
        await this.client.sendMessage(to, message);
    }
}
