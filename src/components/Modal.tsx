import React from "react";

interface ModalProps {
	showModal: boolean;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, children }) => {
	if (!showModal) return null;

	return (
		<div className="modal-overlay">
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
