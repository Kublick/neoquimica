import { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import MetodoForm from "./MetodoForm";

const MetodoModal = ({
	setShowModal,
	showModal,
	titulo,
	editData,
	setEditData,
}) => {
	return (
		<>
			<Modal
				size="sm"
				active={showModal}
				toggler={() => {
					setShowModal(false);
				}}
			>
				<ModalHeader
					toggler={() => {
						setShowModal(false);
						setEditData(null);
					}}
				>
					{titulo}
				</ModalHeader>
				<ModalBody>
					<MetodoForm
						setShowModal={setShowModal}
						showModal={showModal}
						editData={editData}
						setEditData={setEditData}
					/>
				</ModalBody>
			</Modal>
		</>
	);
};

export default MetodoModal;
