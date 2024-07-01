//@ts-ignore

import React, { FC, ReactNode, useState } from "react";
import Select from "react-select";
import { StylesConfig } from "react-select";

import { customStyles } from "./Constants";
import { IssueTicket } from "./TicketList";

import {
	EDIT_SVG,
	NEW_SVG,
	IN_PROGRESS_SVG,
	RESOLVED_SVG,
	DONE_SVG,
	DELETE_SVG,
	UP_SVG,
} from "./Constants";

type OptionType = {
	label: string;
	value: string;
};

interface TicketProps {
	ticket: IssueTicket;
	setTickets: React.Dispatch<React.SetStateAction<IssueTicket[]>>;
	isAdmin?: boolean;
}

const statusOptions = [
	{ value: "New", label: "New", icon: NEW_SVG },
	{ value: "in-progress", label: "In Progress", icon: IN_PROGRESS_SVG },
	{ value: "resolved", label: "Resolved", icon: RESOLVED_SVG },
];

const formatOptionLabel = ({
	label,
	icon,
}: {
	label: string;
	icon: ReactNode;
}) => (
	<div style={{ display: "flex", alignItems: "center" }}>
		{icon}
		<span style={{ marginLeft: 8 }}>{label}</span>
	</div>
);

const Ticket: FC<TicketProps> = ({ ticket, setTickets, isAdmin }) => {
	const [statusBeingEdited, setStatusBeingEdited] = useState<boolean>(false);
	const [status, setStatus] = useState<string>(ticket.status);
	const [commentText, setCommentText] = useState<string>("");

	const handleUpdateStatus = async (_id: any, selectedStatus: string) => {
		try {
			const response = await fetch(`http://localhost:5001/api/tickets/${_id}`, {
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ status: selectedStatus }),
			});
			if (!response.ok) {
				throw new Error(`Failed to add status`);
			}
			await response.json();
			setStatus(selectedStatus);
		} catch (error) {
			console.error(`Error occured while updating status ${error}`);
		}
	};

	const handleAddComment = async (
		e: React.FormEvent<HTMLFormElement>,
		_id: any
	) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:5001/api/tickets/${_id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: commentText, user: "Admin" }),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to add comment: ${response.status} ${response.statusText}`
				);
			}
			const updatedTicket = await response.json();
			setTickets((prevTickets) =>
				prevTickets.map((t) =>
					t._id === ticket._id
						? { ...t, comments: updatedTicket.comments, status }
						: t
				)
			);
			setCommentText("");
		} catch (error: any) {
			console.error(`Error adding comment: ${error.message}`);
		}
	};

	const handleDeleteTicket = async (_id: any) => {
		try {
			const response = await fetch(`http://localhost:5001/api/tickets/${_id}`, {
				method: "DELETE",
				headers: {
					"content-type": "application/json",
				},
			});
			if (response.ok) {
				setTickets((prevTickets) =>
					prevTickets.filter((ticket) => ticket._id !== _id)
				);
			} else {
				console.error("Failed to delete ticket:", await response.json());
			}
		} catch (error) {
			console.error(`Error ${error} while deleting the ticket`);
		}
	};

	const selectorCaretStyles: StylesConfig<OptionType, false> = {
		dropdownIndicator: (provided) => ({
			...provided,
			visibility: statusBeingEdited ? "visible" : "hidden",
		}),
		indicatorSeparator: (provided) => ({
			...provided,
			visibility: statusBeingEdited ? "visible" : "hidden",
		}),
	};

	const showComments = isAdmin || ticket.comments.length;

	return (
		<li className="ticket">
			<section className="ticket-header">
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

				<div className="ticket-status">
					<Select
						isDisabled={!statusBeingEdited}
						options={statusOptions}
						styles={{ ...customStyles, ...selectorCaretStyles }}
						formatOptionLabel={formatOptionLabel}
						value={statusOptions.find((option) => option.value === status)}
						onChange={(selectedOption) =>
							handleUpdateStatus(
								ticket._id,
								selectedOption?.value || ticket.status
							)
						}
					/>
					{isAdmin ? (
						<>
							<button
								className="status-editing-button"
								onClick={() => setStatusBeingEdited(!statusBeingEdited)}
							>
								{statusBeingEdited ? DONE_SVG : EDIT_SVG}
							</button>

							<button
								className="status-editing-button"
								onClick={() => {
									handleDeleteTicket(ticket._id);
								}}
							>
								{DELETE_SVG}
							</button>
						</>
					) : null}
				</div>
			</section>
			{showComments ? (
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
			) : null}
			{isAdmin ? (
				<form
					className="flex-parent-container comment-form"
					onSubmit={(e) => handleAddComment(e, ticket._id)}
				>
					<textarea
						onChange={(e) => setCommentText(e.target.value)}
						className="comment-text-area"
						name="comment-text-area"
						placeholder="Leave a comment"
					/>
					<button>{UP_SVG}</button>
				</form>
			) : null}
		</li>
	);
};

export default Ticket;
