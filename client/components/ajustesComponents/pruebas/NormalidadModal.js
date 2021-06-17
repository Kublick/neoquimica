import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import NormalidadForm from "./NormalidadForm";

const NormalidadModal = ({
	setShowModal,
	showModal,
	titulo,
	tableValues,
	setTableValues,
}) => {
	return (
		<>
			<Modal size="sm" active={showModal} toggler={() => {}}>
				<ModalHeader
					toggler={() => {
						setShowModal(false);
					}}
				>
					{titulo}
				</ModalHeader>
				<ModalBody>
					<NormalidadForm
						setShowModal={setShowModal}
						showModal={showModal}
						// editData={editData}
						//		setEditData={setEditData}
						tableValues={tableValues}
						setTableValues={setTableValues}
					/>
				</ModalBody>
			</Modal>
		</>
	);
};

export default NormalidadModal;
