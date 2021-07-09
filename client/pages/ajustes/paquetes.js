import PaqueteBoard from "../../components/ajustesComponents/paquetes/PaqueteBoard";
import PaqueteForm from "../../components/ajustesComponents/paquetes/PaqueteForm";
import Layout from "../../components/layout/Layout";
import { useMutation, useQueryClient, useQueries } from "react-query";
import {
	addPaquete,
	getPerfiles,
	getPruebas,
	updatePaquete,
} from "../../components/api/ajustesApi";
import { useState } from "react";

const Paquetes = () => {
	const [showModal, setShowModal] = useState(false);
	const [editData, setEditData] = useState("");
	const [titulo, setTitulo] = useState("");

	const queryClient = useQueryClient();
	const results = useQueries([
		{ queryKey: ["pruebas"], queryFn: getPruebas },
		{ queryKey: ["perfil"], queryFn: getPerfiles },
	]);

	const add = useMutation(addPaquete, {
		onSuccess: () => {
			queryClient.invalidateQueries("paquete");
		},
	});

	const update = useMutation(updatePaquete, {
		onSuccess: () => {
			queryClient.invalidateQueries("paquete");
		},
	});

	if (!results) {
		return <p>Cargando...</p>;
	}

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />
			<div className="px-3 -mt-24 md:px-8">
				<div className="xl:col-start-1 xl:col-end-4 mb-14">
					{!showModal ? (
						<PaqueteBoard
							setTitulo={setTitulo}
							setShowModal={setShowModal}
							showModal={showModal}
							editData={editData}
							setEditData={setEditData}
						/>
					) : (
						<PaqueteForm
							add={add}
							update={update}
							results={results}
							editData={editData}
							setShowModal={setShowModal}
							setEditData={setEditData}
						/>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Paquetes;
