export interface CommentTypes {
	user: string;
	text: string;
	createdAt: Date;
}

export interface IssueTicket {
	_id: string;
	__v?: number;
	name: string;
	email: string;
	description: string;
	status: string;
	comments: CommentTypes[];
}

export interface OptionType {
	value: string;
	label: string;
	icon?: React.ReactNode;
}

export interface Props {
	isAdmin: boolean;
	refresh: boolean;
}

export interface TicketProps {
	isAdmin: boolean;
	ticket: IssueTicket;
	setTickets: React.Dispatch<React.SetStateAction<IssueTicket[]>>;
}

export interface TicketListProps {
	isAdmin: boolean;
	refresh?: boolean;
}
