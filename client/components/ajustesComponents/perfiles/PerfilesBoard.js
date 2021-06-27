import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import Button from "@material-tailwind/react/Button";
import Table from "../../table/Table";
import { getPerfiles, getPruebas } from "../../api/ajustesApi";
import Icon from "@material-tailwind/react/Icon";

const PruebaBoard = ({ setShowModal, setEditData }) => {
	const [titulo, setTitulo] = useState("");

	const columns = useMemo(() => [
		{
			Header: "Codigo",
			accessor: "codigo",
		},
		{
			Header: "Abreviatura",
			accessor: "abreviatura",
		},
		{
			Header: "Descripcion",
			accessor: "descripcion",
		},
		{
			accessor: "Departamento",
			accesor: "departamento",
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
						onClick={() => {
							handleEdit(cell.row.original);
						}}
					>
						<Icon name="edit" size="sm" />
					</Button>
				</div>
			),
		},
	]);

	const handleEdit = (data) => {
		setTitulo("Editar Prueba");
		setShowModal(true);
		setEditData(data);
	};

	//React Query Hooks

	const { data, isLoading, isError, error } = useQuery(["perfil"], getPerfiles);

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
					onClick={() => {
						setShowModal(true);
					}}
				>
					Agregar
				</Button>
			</div>
			<Table data={data} columns={columns} titulo={"Perfiles"} />
		</>
	);
};

export default PruebaBoard;
