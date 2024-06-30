import React, { useState } from "react";
import TicketSubmissionForm from "./TicketSubmissionForm";
import IssuesFeed from "./IssuesFeed";

const CustomerView: React.FC = () => {
	const [submissionToggled, setSubmissionToggled] = useState<boolean>(false);
	return (
		<>
			<TicketSubmissionForm
				submissionToggled={submissionToggled}
				setSubmissionToggled={setSubmissionToggled}
			/>
			<IssuesFeed refresh={submissionToggled} />
		</>
	);
};

export default CustomerView;
