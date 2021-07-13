import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ClienteForm from "./ClienteForm";

const MetodoModal = ({
	setShowModal,
	showModal,
	titulo,
	editData,
	setEditData,
	add,
	update,
}) => {
	return (
		<>
			<Modal size="large" active={showModal} toggler={() => {}}>
				<ModalHeader
					toggler={() => {
						setShowModal(false);
						setEditData(null);
					}}
				>
					{titulo}
				</ModalHeader>
				<ModalBody>
					<ClienteForm
						setShowModal={setShowModal}
						showModal={showModal}
						editData={editData}
						setEditData={setEditData}
						add={add}
						update={update}
					/>
				</ModalBody>
			</Modal>
		</>
	);
};

export default MetodoModal;
