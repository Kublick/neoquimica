import { useState } from "react";
import ClienteBoard from "../components/clientes/ClienteBoard";
import ClienteForm from "../components/clientes/ClienteForm";
import Layout from "../components/layout/Layout";

const Clientes = () => {
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
							{!showModal ? (
								<ClienteBoard
									setShowModal={setShowModal}
									setTitulo={setTitulo}
									setEditData={setEditData}
								/>
							) : (
								<ClienteForm />
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Clientes;
