import { IssueTicket } from "./ticketListTypes";

export interface OptionType {
	value: string;
	label: string;
	icon: JSX.Element;
}

export interface TicketProps {
	isAdmin: boolean;
	ticket: IssueTicket;
	setTickets: React.Dispatch<React.SetStateAction<IssueTicket[]>>;
}
