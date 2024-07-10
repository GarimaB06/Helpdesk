import { BASE_URL } from "../components/Constants";

export const handleUpdateStatus = async (
	_id: string,
	selectedStatus: string,
	setStatus: React.Dispatch<React.SetStateAction<string>>
) => {
	try {
		const response = await fetch(`${BASE_URL}/api/tickets/${_id}`, {
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
		console.error(`Error occurred while updating status ${error}`);
	}
};

export const handleAddComment = async (_id: string, commentText: string) => {
	try {
		const response = await fetch(`${BASE_URL}/api/tickets/${_id}`, {
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
		return await response.json();
	} catch (error: any) {
		console.error(`Error adding comment: ${error.message}`);
	}
};

export const handleDeleteTicket = async (_id: string) => {
	try {
		const response = await fetch(`${BASE_URL}/api/tickets/${_id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
			},
		});
		if (response.ok) {
			return await response.json();
		} else {
			console.error("Failed to delete ticket:", await response.json());
		}
	} catch (error) {
		console.error(`Error ${error} while deleting the ticket`);
	}
};
