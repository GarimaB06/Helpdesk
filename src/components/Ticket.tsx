//@ts-nocheck

import React, { useState } from "react";
import TicketHeader from "./TicketHeader";
import TicketStatus from "./TicketStatus";
import { TicketProps } from "../types/ticketTypes";
import {
	handleUpdateStatus,
	handleAddComment,
	handleDeleteTicket,
} from "../utils/ticketUtils";
import { UP_SVG } from "./Constants";

const Ticket: React.FC<TicketProps> = ({ ticket, setTickets, isAdmin }) => {
	const [statusBeingEdited, setStatusBeingEdited] = useState<boolean>(false);
	const [status, setStatus] = useState<string>(ticket.status);
	const [commentText, setCommentText] = useState<string>("");

	const showComments = isAdmin || ticket.comments.length > 0;

	return (
		<li className="ticket">
			<section className="ticket-header">
				<TicketHeader ticket={ticket} />
				<TicketStatus
					statusBeingEdited={statusBeingEdited}
					status={status}
					ticket={ticket}
					setTickets={setTickets}
					handleUpdateStatus={handleUpdateStatus}
					setStatusBeingEdited={setStatusBeingEdited}
					handleDeleteTicket={handleDeleteTicket}
					isAdmin={isAdmin}
					setStatus={setStatus}
				/>
			</section>
			{showComments && (
				<section>
					<h4>Admin Comments</h4>
					{ticket.comments.map((comment, index) => (
						<div className="comment" key={`${index}-${Math.random()}`}>
							<p className="date">
								{new Date(comment.createdAt).toLocaleString()}
							</p>
							<p>{comment.text}</p>
						</div>
					))}
				</section>
			)}
			{isAdmin && (
				<form
					className="flex-parent-container comment-form"
					onSubmit={(e) =>
						handleAddComment(
							e,
							ticket._id,
							commentText,
							setTickets,
							ticket,
							setCommentText
						)
					}
				>
					<textarea
						onChange={(e) => setCommentText(e.target.value)}
						className="comment-text-area"
						name="comment-text-area"
						placeholder="Leave a comment"
					/>
					<button>{UP_SVG}</button>
				</form>
			)}
		</li>
	);
};

export default Ticket;
