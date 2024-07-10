import { Request, Response } from "express";
import Ticket from "../models/Ticket";

export const createTicket = async (req: Request, res: Response) => {
	const newTicket = new Ticket(req.body);
	try {
		await newTicket.save();
		console.log(
			`Would normally send email here with body : ${JSON.stringify(req.body)}`
		);
		res.status(201).json(newTicket);
	} catch (error) {
		console.error("Error saving ticket:", error);
		res.status(500).json({ error: "Failed to save ticket" });
	}
};

export const getAllTickets = async (req: Request, res: Response) => {
	try {
		const allTickets = await Ticket.find();
		res.status(200).json(allTickets);
	} catch (error) {
		console.error("Error fetching tickets:", error);
		res.status(500).json({ error: "Failed to fetch tickets" });
	}
};

export const getTicketById = async (req: Request, res: Response) => {
	try {
		const ticketById = await Ticket.findById(req.params.id);
		if (!ticketById) {
			return res.status(404).json({ error: "Ticket not found" });
		}
		res.status(200).json(ticketById);
	} catch (error) {
		console.error("Error fetching ticket by id:", error);
		res.status(500).json({ error: "Failed to fetch ticket" });
	}
};

export const deleteTicketById = async (req: Request, res: Response) => {
	try {
		console.log("Received delete request for ID:", req.params.id); // Debugging line
		const deleteTicketById = await Ticket.findByIdAndDelete(req.params.id);
		if (!deleteTicketById) {
			return res
				.status(404)
				.json({ error: "Ticket not found - while trying to delete by id" });
		}
		res.status(200).json(deleteTicketById);
	} catch (error) {
		console.error(`Error ${error} while deleting the ticket by id`);
		res.status(500).json({ error: "Failed to delete ticket" });
	}
};

export const addCommentById = async (req: Request, res: Response) => {
	try {
		const { text, user } = req.body;
		const ticket = await Ticket.findById(req.params.id);
		if (!ticket) {
			return res.status(404).json({ error: "Ticket not found" });
		}
		if (text && user) {
			ticket.comments.push({ text, user, createdAt: new Date() });
			await ticket.save();
			res.status(200).json(ticket);
		}
	} catch (error) {
		console.error("Error adding comment:", error);
		res.status(500).json({ error: "Failed to add comment" });
	}
};

export const updateTicketStatus = async (req: Request, res: Response) => {
	try {
		const { status } = req.body;
		const updatedTicket = await Ticket.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ status }
		);
		if (!updatedTicket) {
			return res.status(404).json({ error: "Ticket not found" });
		}
		res.status(200).json(updatedTicket);
	} catch (error) {
		console.error("Error updating ticket:", error);
		res.status(500).json({ error: "Failed to update status" });
	}
};
