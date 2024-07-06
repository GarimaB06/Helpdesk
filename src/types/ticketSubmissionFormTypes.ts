import { Dispatch, SetStateAction } from "react";

export interface FormData {
	name: string;
	email: string;
	description: string;
}

export type Props = {
	submissionToggled: boolean;
	setSubmissionToggled: Dispatch<SetStateAction<boolean>>;
};
