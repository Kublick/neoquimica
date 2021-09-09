import { useQuery } from 'react-query';
import { getPrecios } from '../../components/api/ajustesApi';
import Layout from '../../components/layout/Layout';
import { useMutation, useQueryClient, useQueries } from 'react-query';
import { getAllClientes } from '../../components/api/clientesApi';

const Precios = () => {
	const queryClient = useQueryClient();

	const results = useQueries([
		{ queryKey: ['precios'], queryFn: getPrecios },
		{ queryKey: ['clientes'], queryFn: getAllClientes },
	]);

	let precios = results[0].data;
	let clientes = results[1].data;

	return (
		<Layout>
			<div className="h-20 px-3 bg-light-blue-500 md:px-8" />

			<div className="px-3 -mt-24 md:px-8">
				<div className="container max-w-full mx-auto">
					<div className="xl:col-start-1 xl:col-end-4 mb-14">
						{clientes.map((c) => (
							<p key={c._id}>{c.nombre}</p>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Precios;
