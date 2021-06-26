import { useState } from "react";
import Layout from "../../components/layout/Layout";
import PruebaBoard from "../../components/ajustesComponents/pruebas/PruebaBoard";
import PruebaForm from "../../components/ajustesComponents/pruebas/PruebaForm";
import { useMutation, useQueryClient, useQueries } from "react-query";
import {
	addPrueba,
	getDepartamentos,
	getMetodos,
	getMuestras,
	updatePrueba,
} from "../../components/api/ajustesApi";

const Prueba = () => {
	const [showModal, setShowModal] = useState(false);
	const [editData, setEditData] = useState("");
	const queryClient = useQueryClient();

	const results = useQueries([
		{ queryKey: ["departamentos"], queryFn: getDepartamentos },
		{ queryKey: ["metodo"], queryFn: getMetodos },
		{ queryKey: ["muestra"], queryFn: getMuestras },
	]);

	const add = useMutation(addPrueba, {
		onSuccess: () => {
			queryClient.invalidateQueries("prueba");
		},
	});

	const update = useMutation(updatePrueba, {
		onSuccess: () => {
			queryClient.invalidateQueries("prueba");
		},
	});

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />

			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<div className="xl:col-start-1 xl:col-end-4 mb-14">
						<div>
							{!showModal ? (
								<PruebaBoard
									setShowModal={setShowModal}
									setEditData={setEditData}
								/>
							) : null}
							{showModal ? (
								<PruebaForm
									editData={editData}
									setEditData={setEditData}
									results={results}
									update={update}
									add={add}
									setShowModal={setShowModal}
									showModal={showModal}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Prueba;
