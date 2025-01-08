import { WhatsAppBot } from "@/apps/bot";
import { botEvents } from "@/events/events";

botEvents.on("message_received", (message) => {
    console.log(message.body);
});

botEvents.on("message_send", async (to, message) => {
    const bot = WhatsAppBot.getInstance();

    await bot.sendMessage(to, message);
});
