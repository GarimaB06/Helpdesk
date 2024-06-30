import mongoose, { Schema, Document } from "mongoose";

interface CommentTypes {
	user: string;
	text: string;
	createdAt: Date;
}

interface TicketTypes {
	name: string;
	email: string;
	description: string;
	status: string;
	comments: CommentTypes[];
}

const commentSchema = new mongoose.Schema<CommentTypes>({
	user: { type: String, required: true },
	text: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema<TicketTypes>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String, default: "New" },
	comments: { type: [commentSchema], default: [] },
});

const Ticket = mongoose.model<TicketTypes>("Ticket", ticketSchema);

export default Ticket;
