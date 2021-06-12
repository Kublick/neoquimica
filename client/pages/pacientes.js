import Layout from "../components/layout/Layout";
import PatientsBoard from "../components/patientComponents/PatientsBoard";

const Pacientes = () => {
	return (
		<Layout>
			<div className="h-40 px-3 bg-light-blue-500 md:px-8" />

			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<div className="xl:col-start-1 xl:col-end-4 mb-14">
						<div>
							<PatientsBoard />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Pacientes;
