import { SetStateAction, Dispatch } from "react";
import { Options } from "../App";

export interface OptionsPickerProps {
	selectedOption: string;
	setSelectedOption: Dispatch<SetStateAction<Options>>;
}
