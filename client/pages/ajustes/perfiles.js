import Layout from "../../components/layout/Layout";
import PerfilesBoard from "../../components/ajustesComponents/perfiles/PerfilesBoard";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	addPerfil,
	getMetodos,
	updatePerfil,
} from "../../components/api/ajustesApi";
import PerfilForm from "../../components/ajustesComponents/perfiles/PerfilForm";
import { useState } from "react";

const Perfiles = () => {
	const queryClient = useQueryClient();
	const [showModal, setShowModal] = useState(false);
	const [editData, setEditData] = useState("");

	const add = useMutation(addPerfil, {
		onSuccess: () => {
			queryClient.invalidateQueries("perfil");
		},
	});

	const update = useMutation(updatePerfil, {
		onSuccess: () => {
			queryClient.invalidateQueries("perfil");
		},
	});

	const { data, isLoading, isError, error } = useQuery(["metodo"], getMetodos);

	if (!data) {
		return <p>Loading</p>;
	}

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />
			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					{!showModal ? (
						<PerfilesBoard
							setShowModal={setShowModal}
							showModal={showModal}
							editData={editData}
							setEditData={setEditData}
						/>
					) : null}

					{showModal ? (
						<PerfilForm
							add={add}
							update={update}
							results={data}
							setShowModal={setShowModal}
							showModal={showModal}
							editData={editData}
							setEditData={setEditData}
						/>
					) : null}
				</div>
			</div>
		</Layout>
	);
};

export default Perfiles;
