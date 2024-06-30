import mongoose from "mongoose";

interface UserDocument extends mongoose.Document {
	username: string;
	password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
