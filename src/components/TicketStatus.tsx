//@ts-nocheck

import React from "react";
import Select from "react-select";
import { StylesConfig } from "react-select";
import {
	statusOptions,
	formatOptionLabel,
	customStyles,
	DONE_SVG,
	EDIT_SVG,
	DELETE_SVG,
} from "./Constants";
import { IssueTicket, OptionType } from "../types/ticketListTypes";

interface TicketStatusProps {
	statusBeingEdited: boolean;
	status: string;
	ticket: IssueTicket;
	setTickets: React.Dispatch<React.SetStateAction<IssueTicket[]>>;
	handleUpdateStatus: (
		id: string,
		selectedStatus: string,
		setStatus: React.Dispatch<React.SetStateAction<string>>
	) => void;
	setStatusBeingEdited: React.Dispatch<React.SetStateAction<boolean>>;
	handleDeleteTicket: (
		id: string,
		setTickets: React.Dispatch<React.SetStateAction<IssueTicket[]>>
	) => void;
	isAdmin: boolean;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const TicketStatus: React.FC<TicketStatusProps> = ({
	statusBeingEdited,
	status,
	ticket,
	setTickets,
	handleUpdateStatus,
	setStatusBeingEdited,
	handleDeleteTicket,
	isAdmin,
	setStatus,
}) => {
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

	return (
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
						selectedOption?.value || ticket.status,
						setStatus
					)
				}
			/>
			{isAdmin && (
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
							handleDeleteTicket(ticket._id, setTickets);
						}}
					>
						{DELETE_SVG}
					</button>
				</>
			)}
		</div>
	);
};

export default TicketStatus;
