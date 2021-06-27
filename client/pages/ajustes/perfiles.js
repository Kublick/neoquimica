import Layout from "../../components/layout/Layout";
import PerfilesBoard from "../../components/ajustesComponents/perfiles/PerfilesBoard";
import { useQuery } from "react-query";
import { getMetodos } from "../../components/api/ajustesApi";
import PerfilForm from "../../components/ajustesComponents/perfiles/PerfilForm";

const Perfiles = () => {
	const { data, isLoading, isError, error } = useQuery(["metodo"], getMetodos);

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />
			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<PerfilesBoard />
					<PerfilForm results={data} />
				</div>
			</div>
		</Layout>
	);
};

export default Perfiles;
