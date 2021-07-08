import { useMemo } from "react";
import { useQuery } from "react-query";
import Button from "@material-tailwind/react/Button";
import Table from "../../table/Table";
import { getMuestras } from "../../api/ajustesApi";
import Icon from "@material-tailwind/react/Icon";

const MuestraBoard = ({ setShowModal, setTitulo, setEditData }) => {
	const columns = useMemo(() => [
		{
			Header: "Abreviatura",
			accessor: "abreviatura",
		},
		{
			Header: "Nombre",
			accessor: "nombre",
		},
		{
			Header: "Acciones",
			accessor: "_id",
			Cell: ({ cell }) => (
				<div className="flex justify-center">
					<Button
						color="blueGray"
						buttonType="filled"
						size="regular"
						rounded={true}
						block={false}
						iconOnly={true}
						ripple="light"
						onClick={() => handleEdit(cell.row.values)}
					>
						<Icon name="edit" size="sm" />
					</Button>
				</div>
			),
		},
	]);

	const handleEdit = (data) => {
		setTitulo("Editar Muestra");
		setShowModal(true);
		setEditData(data);
	};

	//React Query Hooks

	const { data, isLoading, isError, error } = useQuery(
		["muestra"],
		getMuestras
	);

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	if (!data || isLoading)
		return (
			<div className="flex justify-center ">
				<p>Error</p>
			</div>
		);

	return (
		<>
			<div className="flex justify-end mb-12 ">
				<Button
					color="purple"
					buttonType="solid"
					size="regular"
					rounded={true}
					block={false}
					iconOnly={false}
					ripple="dark"
					onClick={(e) => {
						setTitulo("Agregar Muestra");
						setShowModal(true);
					}}
				>
					Agregar
				</Button>
			</div>
			<Table data={data} columns={columns} titulo={"Muestra"} />
		</>
	);
};

export default MuestraBoard;
