import { WhatsAppBot } from "@/apps/bot";
import { userRepository } from "@/database/repositories/user.repository";
import { botEvents } from "@/events/events";

botEvents.on("message_received", async (message): Promise<void> => {
    console.log(`New message from: ${message._data.notifyName}\nMessage: ${message.body}`);

    const user = await userRepository.findOne({ phone: message.from });

    if (!user) {
        await userRepository.create({
            name: message._data.notifyName,
            phone: message.from
        });
        return;
    }
});

botEvents.on("message_send", async (to, message): Promise<void> => {
    const bot = WhatsAppBot.getInstance();

    await bot.sendMessage(to, message);
});
