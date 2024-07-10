import { Router } from "express";
import {
	createTicket,
	getAllTickets,
	getTicketById,
	deleteTicketById,
	addCommentById,
	updateTicketStatus,
} from "../controllers/ticketController";

const router = Router();

router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.delete("/:id", deleteTicketById);
router.put("/:id", addCommentById);
router.patch("/:id", updateTicketStatus);

export default router;
