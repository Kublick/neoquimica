import { useState } from "react";
import ClienteBoard from "../components/clientes/ClienteBoard";
import Layout from "../components/layout/Layout";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	addCliente,
	getAllClientes,
	updateCliente,
} from "../components/api/clientesApi";
import ClienteModal from "../components/clientes/ClienteModal";

const Clientes = () => {
	const queryClient = useQueryClient();

	const add = useMutation(addCliente, {
		onSuccess: () => {
			queryClient.invalidateQueries("clientes");
		},
	});

	const update = useMutation(updateCliente, {
		onSuccess: () => {
			queryClient.invalidateQueries("clientes");
		},
	});

	const { data, isLoading, isError, error } = useQuery(
		["clientes"],
		getAllClientes
	);

	if (isLoading) {
		console.log(isLoading);
	}

	if (error) {
		console.log(error);
		return;
	}

	const [showModal, setShowModal] = useState(false);
	const [titulo, setTitulo] = useState("");
	const [editData, setEditData] = useState([]);

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />

			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<div className="xl:col-start-1 xl:col-end-4 mb-14">
						<div>
							<ClienteBoard
								setShowModal={setShowModal}
								setTitulo={setTitulo}
								setEditData={setEditData}
							/>
							{showModal ? (
								<ClienteModal
									setShowModal={setShowModal}
									showModal={showModal}
									titulo={titulo}
									setEditData={setEditData}
									editData={editData}
									add={add}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Clientes;
