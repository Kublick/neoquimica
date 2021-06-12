import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import PatientTable from "./PatientTable";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllPatients } from "../api/patientApi";
import Button from "@material-tailwind/react/Button";

const PatientsBoard = () => {
	const columns = useMemo(() => [
		{
			Header: "Clave",
			accessor: "shortId",
		},
		{
			Header: "Nombre",
			accessor: "name",
		},
		{
			Header: "Apellido",
			accessor: "lastName",
		},
		{
			Header: "Email",
			accessor: "email",
		},
		{
			Header: "Telefono",
			accessor: "phone",
		},
		{
			Header: "Genero",
			accessor: "gender",
		},
		{
			Header: "Fecha de Nacimiento",
			accessor: "birthDate",
			Cell: ({ value }) => <div>{format(new Date(value), "yyyy-MM-dd")}</div>,
		},
		{
			Header: "Acciones",
			accessor: "id",
			Cell: ({ cell }) => (
				<div>
					<button
						className="px-4 rounded-xl"
						onClick={() => handleDelete(cell.row.values.id)}
					>
						delete
					</button>
					<button
						className="px-4 rounded-xl"
						onClick={() => handleEdit(cell.row.values)}
					>
						edit
					</button>
				</div>
			),
		},
	]);

	//React Query Hooks

	const { data, isLoading, isError, error } = useQuery(
		["patients"],
		getAllPatients
	);

	// const { mutate } = useMutation(deleteUser, {
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries("patients");
	// 	},
	// });

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
				>
					Agregar
				</Button>
			</div>
			<PatientTable data={data} columns={columns} />
		</>
	);
};

export default PatientsBoard;
