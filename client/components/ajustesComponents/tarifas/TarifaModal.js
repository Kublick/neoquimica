import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import TarifaForm from "./TarifaForm";

const TarifaModal = ({
	setShowModal,
	showModal,
	titulo,
	editData,
	setEditData,
}) => {
	return (
		<>
			<Modal size="sm" active={showModal} toggler={() => {}}>
				<ModalHeader
					toggler={() => {
						setShowModal(false);
						setEditData(null);
					}}
				>
					{titulo}
				</ModalHeader>
				<ModalBody>
					<TarifaForm
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

export default TarifaModal;
