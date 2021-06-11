import Layout from "../components/layout/Layout";
import PatientTable from "../components/patientComponents/PatientTable";
const Pacientes = () => {
	return (
		<Layout>
			<div className="h-40 px-3 bg-light-blue-500 md:px-8" />

			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<div className="xl:col-start-1 xl:col-end-4 mb-14">
						<div className="w-full px-4 bg-white rounded-lg shadow-lg">
							<PatientTable />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Pacientes;
