import React, { useState } from "react";
import TicketSubmissionForm from "./TicketSubmissionForm";

const CustomerView: React.FC = () => {
	const [submissionToggled, setSubmissionToggled] = useState<boolean>(false);
	return (
		<>
			<TicketSubmissionForm
				submissionToggled={submissionToggled}
				setSubmissionToggled={setSubmissionToggled}
			/>
		</>
	);
};

export default CustomerView;
