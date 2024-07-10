//@ts-nocheck

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketHeader from "./TicketHeader";
import TicketStatus from "./TicketStatus";
import { TicketProps } from "../types/ticketTypes";
import {
	handleUpdateStatus,
	handleAddComment,
	handleDeleteTicket,
} from "../utils/ticketUtils";
import { BASE_URL } from "./Constants";
import { UP_SVG } from "./Constants";

const Ticket: React.FC<TicketProps> = ({ isAdmin }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [ticket, setTicket] = useState(null);
	const [statusBeingEdited, setStatusBeingEdited] = useState<boolean>(false);
	const [status, setStatus] = useState<string>("");
	const [commentText, setCommentText] = useState<string>("");

	const fetchTicket = async () => {
		try {
			const ticketData = await fetch(`${BASE_URL}/api/tickets/${id}`);
			const ticketJson = await ticketData.json();
			setTicket(ticketJson);
			setStatus(ticketJson.status);
		} catch (error) {
			console.error(`Error fetching ticket: ${error}`);
		}
	};

	useEffect(() => {
		fetchTicket();
	}, [id]);

	if (!ticket) return <div>Loading...</div>;

	const showComments = isAdmin || ticket.comments.length > 0;

	const handleDeleteAndRedirect = async () => {
		try {
			await handleDeleteTicket(ticket._id);
			navigate("/admin-panel");
		} catch (e) {
			console.log(`Error ${e} while deleting ticket`);
		}
	};

	const handleAddCommentSubmit = async (e) => {
		e.preventDefault();
		try {
			await handleAddComment(ticket._id, commentText);
			await fetchTicket();
			setCommentText("");
		} catch (e) {
			console.log(`Error ${e} while submitting comment`);
		}
	};

	return (
		<div className="ticket-page">
			<button
				className="secondary-button"
				onClick={() => navigate("/admin-panel")}
			>
				Back
			</button>
			<div className="ticket-page-content-parent">
				<section className="ticket-page-content">
					<TicketStatus
						statusBeingEdited={statusBeingEdited}
						status={status}
						ticket={ticket}
						handleUpdateStatus={handleUpdateStatus}
						setStatusBeingEdited={setStatusBeingEdited}
						handleDeleteTicket={handleDeleteAndRedirect}
						isAdmin={isAdmin}
						setStatus={setStatus}
					/>
					<TicketHeader ticket={ticket} />
					{showComments && (
						<section>
							<h5>Admin Comments</h5>
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
					<form
						className="flex-parent-container comment-form"
						onSubmit={handleAddCommentSubmit}
					>
						<textarea
							onChange={(e) => setCommentText(e.target.value)}
							className="comment-text-area"
							name="comment-text-area"
							placeholder="Leave a comment"
							value={commentText}
						/>
						<button>{UP_SVG}</button>
					</form>
				</section>
			</div>
		</div>
	);
};

export default Ticket;
