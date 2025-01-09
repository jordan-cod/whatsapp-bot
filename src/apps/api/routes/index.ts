import { botEvents } from "@/events/events";
import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";

const router = Router();

const webhookSchema = z.object({
    to: z.string().min(1, "The 'to' field is required."),
    message: z.string().min(1, "The 'message' field is required.")
});

router.post("/webhook", (req: Request, res: Response, next: NextFunction) => {
    try {
        const { to, message } = webhookSchema.parse(req.body);

        botEvents.sendMessage(to, message);

        return res.status(200).json({ message: "Message sent!" });
    } catch (error: unknown) {
        next(error);
    }
});

// router.get("/user/:id", (req: Request, res: Response) => {
//     // TODO: Implement user endpoint
//     return res.status(200).json({ message: "Hello World!" });
// });

export default router;
