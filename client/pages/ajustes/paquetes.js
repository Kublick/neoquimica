import PaqueteBoard from "../../components/ajustesComponents/paquetes/PaqueteBoard";
import PaqueteForm from "../../components/ajustesComponents/paquetes/PaqueteForm";
import Layout from "../../components/layout/Layout";

const Paquetes = () => {
	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />
			<div className="px-3 -mt-24 md:px-8">
				<div className="xl:col-start-1 xl:col-end-4 mb-14">
					<PaqueteBoard />
					<PaqueteForm />
				</div>
			</div>
		</Layout>
	);
};

export default Paquetes;
