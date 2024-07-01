import React, { useEffect, useState } from "react";
import { SignOutButton } from "@clerk/clerk-react";
import Ticket from "./Ticket";
import { BASE_URL } from "./Constants";

export interface CommentTypes {
	user: string;
	text: string;
	createdAt: Date;
}

export interface IssueTicket {
	_id: string;
	name: string;
	email: string;
	description: string;
	status: string;
	comments: CommentTypes[];
}

type Props = {
	isAdmin?: boolean;
	refresh?: boolean;
};

const TicketList: React.FC<Props> = ({ isAdmin, refresh }) => {
	const [tickets, setTickets] = useState<IssueTicket[]>([]);

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const ticketsData = await fetch(`${BASE_URL}/api/tickets`);
				const ticketsJson = await ticketsData.json();
				setTickets(ticketsJson);
			} catch (error) {
				console.log(
					`Error occurred while fetching tickets data in Admin panel - ${error}`
				);
			}
		};
		fetchTickets();
	}, [refresh]);

	return (
		<>
			{isAdmin ? (
				<div className="heading-wrapper">
					<h2 className="admin-panel-heading ">All issues</h2>
				</div>
			) : null}
			<div className={`list-container${isAdmin ? " admin-list" : ""}`}>
				<ul className="ticket-list">
					{tickets.map((ticket) => (
						<Ticket
							isAdmin={isAdmin}
							ticket={ticket}
							setTickets={setTickets}
							key={`${ticket._id}-${Math.random()}`}
						/>
					))}
				</ul>
			</div>
			{isAdmin ? <SignOutButton /> : null}
		</>
	);
};

export default TicketList;
