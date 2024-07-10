//@ts-nocheck

import React, { useState } from "react";
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
import Modal from "./Modal";
import { UNFOLD } from "./Constants";

interface TicketStatusProps {
	handleUpdateStatus: (
		id: string,
		selectedStatus: string,
		setStatus: React.Dispatch<React.SetStateAction<string>>
	) => void;
	handleDeleteTicket: () => void;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	setStatusBeingEdited: React.Dispatch<React.SetStateAction<boolean>>;
	status: string;
	statusBeingEdited: boolean;
	ticket: IssueTicket;
}

const TicketStatus: React.FC<TicketStatusProps> = ({
	statusBeingEdited,
	status,
	ticket,
	handleDeleteTicket,
	handleUpdateStatus,
	setStatusBeingEdited,
	setStatus,
}) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const toggleModal = () => {
		setShowModal(!showModal);
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

	const handleConfirmDelete = async () => {
		try {
			await handleDeleteTicket(ticket._id);
		} catch (e) {
			console.log(`Error ${e} while deleting ticket`);
		}
		setShowModal(false);
	};

	return (
		<div className="ticket-status">
			<div className="select-and-button">
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
				<div
					className="status-editing-button"
					onClick={() => setStatusBeingEdited(!statusBeingEdited)}
				>
					{statusBeingEdited ? DONE_SVG : EDIT_SVG}
				</div>
				<div
					className="status-editing-button"
					onClick={() => setShowModal(true)}
				>
					{DELETE_SVG}
				</div>
			</div>
			<Modal showModal={showModal} onClose={toggleModal}>
				<div className="confirmation-dialog">
					<p>Are you sure you want to delete this ticket?</p>
					<div className="confirmation-buttons">
						<button className="secondary-button" onClick={handleConfirmDelete}>
							Delete
						</button>
						<button
							className="secondary-button"
							onClick={() => setShowModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default TicketStatus;
