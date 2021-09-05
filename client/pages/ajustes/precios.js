import { useQuery } from 'react-query';
import { getPrecios } from '../../components/api/ajustesApi';
import Layout from '../../components/layout/Layout';

const Precios = () => {
	const { data: precios } = useQuery(['precios'], getPrecios);

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />

			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<div className="xl:col-start-1 xl:col-end-4 mb-14"></div>
				</div>
				<h1 className="mt-40">{JSON.stringify(precios)}</h1>
			</div>
		</Layout>
	);
};

export default Precios;
