import mongoose from "mongoose";

class Database {
    public async connect(): Promise<void> {
        if (!process.env.MONGODB_URI) {
            throw new Error("[DATABASE] MongoDB URI not set.");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("[DATABASE] Connected to MongoDB.");
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log("[DATABASE] Disconnected from MongoDB.");
    }
}

export const database = new Database();
