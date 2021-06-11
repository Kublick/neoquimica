import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllPatients } from "../api/patientApi";

const PatientTable = () => {
	//React Query Hooks
	const queryClient = useQueryClient();
	// const { mutate } = useMutation(deleteUser, {
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries("patients");
	// 	},
	// });

	const {
		data: patients,
		isLoading,
		isError,
		error,
	} = useQuery(["patients"], getAllPatients);

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	if (!patients || isLoading)
		return (
			<div className="flex justify-center ">
				<p>Error</p>
			</div>
		);

	return (
		<div>
			{patients.map((patient) => (
				<div key={patient._id}>{patient.name} </div>
			))}
		</div>
	);
};

export default PatientTable;
