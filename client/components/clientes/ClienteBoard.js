import { useMemo, useState } from "react";
import { getAllClientes } from "../api/clientesApi";
import Table from "../table/Table";
import { useQuery } from "react-query";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { format } from "date-fns";

const ClienteBoard = ({ setShowModal, setTitulo, setEditData }) => {
	const columns = useMemo(() => [
		{
			Header: "Clave",
			accessor: "shortId",
		},
		{
			Header: "Nombre",
			accessor: "nombre",
		},
		{
			Header: "Email",
			accessor: "email",
		},
		{
			Header: "Telefono",
			accessor: "telefono",
		},
		{
			Header: "Tarifa Base",
			accessor: "tarifa",
		},
		{
			Header: "Fecha Alta",
			accessor: "createdAt",
			Cell: ({ value }) => (
				<div>{format(new Date(value), "yyyy-MM-dd HH:mm")}</div>
			),
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
						onClick={() => handleEdit(cell.row.original)}
					>
						<Icon name="edit" size="sm" />
					</Button>
				</div>
			),
		},
	]);

	const handleEdit = (data) => {
		setTitulo("Editar Clientes");
		setShowModal(true);
		setEditData(data);
	};

	const { data, isLoading, isError, error } = useQuery(
		["clientes"],
		getAllClientes
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
						setTitulo("Agregar Cliente");
						setShowModal(true);
					}}
				>
					Agregar
				</Button>
			</div>
			<Table data={data} columns={columns} titulo={"Clientes"} />
		</>
	);
};

export default ClienteBoard;
