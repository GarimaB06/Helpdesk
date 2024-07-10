import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketStatus from "./TicketStatus";
import { handleDeleteTicket, handleUpdateStatus } from "../utils/ticketUtils";
import { IssueTicket } from "../types/ticketListTypes";
import { UNFOLD } from "./Constants";

interface SummaryProps {
	ticket: IssueTicket;
	fetchTickets: () => void;
}

const Summary: React.FC<SummaryProps> = ({ ticket, fetchTickets }) => {
	const navigate = useNavigate();
	const [statusBeingEdited, setStatusBeingEdited] = useState<boolean>(false);
	const [status, setStatus] = useState<string>(ticket.status);

	const getTruncatedDescription = (description: string, length: number) => {
		if (description.length <= length) {
			return description;
		}
		const truncated = description.slice(0, length);
		const lastSpaceIndex = truncated.lastIndexOf(" ");
		return `${truncated.slice(0, lastSpaceIndex)}...`;
	};

	const descriptionLength = 140;

	const handleUnfoldClick = () => {
		navigate(`/tickets/${ticket._id}`);
	};

	const handleDeleteTicketAndRefetchList = async () => {
		try {
			await handleDeleteTicket(ticket._id);
			await fetchTickets();
		} catch (e) {
			console.log(
				`Error ${e} occurred while deleting ticket data in Admin panel`
			);
		}
	};

	return (
		<div className="summary">
			<div className="summary-header">
				<p>
					<label className="label">Name: </label>
					<span className="ticket-content">{ticket.name}</span>
				</p>
				<TicketStatus
					statusBeingEdited={statusBeingEdited}
					status={status}
					ticket={ticket}
					handleUpdateStatus={handleUpdateStatus}
					setStatusBeingEdited={setStatusBeingEdited}
					handleDeleteTicket={handleDeleteTicketAndRefetchList}
					setStatus={setStatus}
				/>
			</div>
			<div>
				<p>
					<label className="label">Email: </label>
					<span className="ticket-content">{ticket.email}</span>
				</p>
				<p className="label">Issue Description: </p>
				<p className="ticket-content truncate-text">
					{getTruncatedDescription(ticket.description, descriptionLength)}
				</p>
			</div>
			<div className="unfold" onClick={handleUnfoldClick}>
				{UNFOLD}
			</div>
		</div>
	);
};

export default Summary;
