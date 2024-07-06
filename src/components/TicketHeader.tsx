import React from "react";
import { IssueTicket } from "../types/ticketListTypes";

type TicketHeaderProps = {
	ticket: IssueTicket;
};

const TicketHeader: React.FC<TicketHeaderProps> = ({ ticket }) => {
	return (
		<>
			<div>
				<p>
					<label className="label">Name: </label>
					<span className="ticket-content">{ticket.name}</span>
				</p>
				<p>
					<label className="label">Email: </label>
					<span className="ticket-content">{ticket.email}</span>
				</p>
				<p>
					<label className="label">Description: </label>
					<span className="ticket-content">{ticket.description}</span>
				</p>
			</div>
		</>
	);
};

export default TicketHeader;
