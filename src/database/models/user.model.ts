import mongoose, { Document } from "mongoose";

export interface User extends Document {
    name: string;
    phone: string;
}

const UserSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    { collection: "users" }
);
export const UserModel = mongoose.model<User>("User", UserSchema);
