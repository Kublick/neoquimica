import { useState } from "react";
import Layout from "../../components/layout/Layout";
import TarifaBoard from "../../components/ajustesComponents/tarifas/TarifaBoard";
import TarifaModal from "../../components/ajustesComponents/tarifas/TarifaModal";

const Tarifas = () => {
	const [showModal, setShowModal] = useState(false);
	const [titulo, setTitulo] = useState("");
	const [editData, setEditData] = useState("");

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />

			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<div className="xl:col-start-1 xl:col-end-4 mb-14">
						<div>
							<TarifaBoard
								setShowModal={setShowModal}
								setTitulo={setTitulo}
								setEditData={setEditData}
							/>
							<TarifaModal
								setShowModal={setShowModal}
								showModal={showModal}
								titulo={titulo}
								setEditData={setEditData}
								editData={editData}
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Tarifas;
