import React from "react";
import TicketList from "./TicketList";

type Props = {
	refresh: boolean;
};
const IssuesFeed: React.FC<Props> = ({ refresh }) => {
	return (
		<>
			<div className="list-container issues-feed">
				<div className="subheading">Open Issues</div>
				<TicketList refresh={refresh} />
			</div>
		</>
	);
};

export default IssuesFeed;
