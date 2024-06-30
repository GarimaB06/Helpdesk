import React, { SetStateAction, Dispatch } from "react";
import { Options } from "../App";

interface OptionsPickerProps {
	selectedOption: string;
	setSelectedOption: Dispatch<SetStateAction<Options>>;
}

const OptionsPicker: React.FC<OptionsPickerProps> = ({
	selectedOption,
	setSelectedOption,
}) => {
	const handleOptionPick = (option: Options) => {
		setSelectedOption(option);
	};

	return (
		<div className="options-picker">
			<div
				className={`option ${selectedOption === "customer" ? "selected" : ""}`}
				onClick={() => handleOptionPick("customer")}
			>
				Customer
			</div>
			<div
				className={`option ${selectedOption === "admin" ? "selected" : ""}`}
				onClick={() => handleOptionPick("admin")}
			>
				Admin
			</div>
			<div className={`slider ${selectedOption}`}></div>
		</div>
	);
};

export default OptionsPicker;
