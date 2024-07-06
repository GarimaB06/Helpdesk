import React, { useEffect, useState } from "react";
import { SignOutButton } from "@clerk/clerk-react";
import Ticket from "./Ticket";
import { BASE_URL } from "./Constants";
import { IssueTicket, TicketListProps } from "../types/ticketListTypes";

const TicketList: React.FC<TicketListProps> = ({ isAdmin, refresh }) => {
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
