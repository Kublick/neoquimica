import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import PruebaForm from "./PruebaForm";

const MetodoModal = ({
	setShowModal,
	showModal,
	titulo,
	editData,
	setEditData,
}) => {
	return (
		<>
			<Modal size="regular" active={showModal} toggler={() => {}}>
				<ModalHeader
					toggler={() => {
						setShowModal(false);
						setEditData(null);
					}}
				>
					{titulo}
				</ModalHeader>
				<ModalBody>
					<PruebaForm
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
