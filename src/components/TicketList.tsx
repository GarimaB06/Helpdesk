// @ts-nocheck

import React, { useEffect, useState } from "react";
import { SignOutButton } from "@clerk/clerk-react";
import { BASE_URL } from "./Constants";
import { IssueTicket, TicketListProps } from "../types/ticketListTypes";
import Summary from "./Summary";

const TicketList: React.FC<TicketListProps> = ({ isAdmin, refresh }) => {
	const [tickets, setTickets] = useState<IssueTicket[]>([]);

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

	useEffect(() => {
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
				{tickets.length ? (
					<ul className="ticket-list">
						{tickets.map((ticket) => (
							<React.Fragment key={`${ticket._id}-${Math.random()}`}>
								<Summary
									ticket={ticket}
									setTickets={setTickets}
									fetchTickets={fetchTickets}
								/>
							</React.Fragment>
						))}
					</ul>
				) : (
					<p className="subheading">No open issues!</p>
				)}
			</div>

			{isAdmin ? <SignOutButton className="primary-button" /> : null}
		</>
	);
};

export default TicketList;
