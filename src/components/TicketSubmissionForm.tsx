import React, { useState, ChangeEvent, FormEvent } from "react";
import { BASE_URL } from "./Constants";
import { FormData, Props } from "../types/ticketSubmissionFormTypes";

const TicketSubmissionForm: React.FC<Props> = ({
	submissionToggled,
	setSubmissionToggled,
}) => {
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		description: "",
	});

	const handleFormChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const response = await fetch(`${BASE_URL}/api/tickets`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			console.log(data);
			setSubmissionToggled(!submissionToggled);
		} catch (error) {
			console.log(`Error occurred while submitting the ticket form - ${error}`);
		}
		setSubmitted(true);
	};

	return (
		<div className="flex-parent-container">
			<p className="subheading">Ticket Submission Form</p>
			<form onSubmit={handleSubmit} className="flex-parent-container">
				<div>
					<input
						className="input-feild"
						placeholder="Name"
						type="text"
						name="name"
						value={formData.name}
						onChange={handleFormChange}
						disabled={submitted}
						required
					/>
				</div>
				<div>
					<input
						className="input-feild"
						placeholder="Email"
						type="text"
						name="email"
						value={formData.email}
						onChange={handleFormChange}
						disabled={submitted}
						required
					/>
				</div>
				<div>
					<textarea
						className="text-area"
						placeholder="Describe your issue"
						name="description"
						id="description"
						value={formData.description}
						onChange={handleFormChange}
						disabled={submitted}
						required
					></textarea>
				</div>
				<button type="submit" aria-label="Submit" className="primary-button">
					{submitted ? "Submitted" : "Submit"}
				</button>
			</form>
			{submitted && (
				<>
					<a
						onClick={() => {
							setSubmitted(false);
							setFormData({
								name: "",
								email: "",
								description: "",
							});
						}}
						className="reset-link"
					>
						Click to submit another ticket
					</a>
				</>
			)}
		</div>
	);
};

export default TicketSubmissionForm;
