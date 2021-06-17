import { useState } from "react";
import Layout from "../../components/layout/Layout";
import PruebaModal from "../../components/ajustesComponents/pruebas/PruebaModal";
import PruebaBoard from "../../components/ajustesComponents/pruebas/PruebaBoard";
import PruebaForm from "../../components/ajustesComponents/pruebas/PruebaForm";

const Prueba = () => {
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
							{!showModal ? (
								<PruebaBoard
									setShowModal={setShowModal}
									setTitulo={setTitulo}
									setEditData={setEditData}
								/>
							) : null}
							{showModal ? (
								<PruebaForm
									setShowModal={setShowModal}
									showModal={showModal}
									editData={editData}
									setEditData={setEditData}
								/>
							) : null}
							{/* <PruebaModal
								setShowModal={setShowModal}
								showModal={showModal}
								titulo={titulo}
								setEditData={setEditData}
								editData={editData}
							/> */}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Prueba;
