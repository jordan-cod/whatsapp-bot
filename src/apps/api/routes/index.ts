import { botEvents } from "@/events/events";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/webhook", (req: Request, res: Response) => {
    // TODO: Implement webhook
    const { to, message } = req.body;
    botEvents.sendMessage(to, message);
    return res.status(200).json({ message: "Message sent!" });
});

// router.get("/user/:id", (req: Request, res: Response) => {
//     // TODO: Implement user endpoint
//     return res.status(200).json({ message: "Hello World!" });
// });

export default router;
