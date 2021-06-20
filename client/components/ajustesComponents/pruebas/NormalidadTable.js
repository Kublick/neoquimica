import Button from "@material-tailwind/react/Button";
import { useEffect, useState } from "react";
import NormalidadModal from "./NormalidadModal";

const NormalidadTable = ({ tableValues, setTableValues }) => {
	const [showModal, setShowModal] = useState(false);
	const [disable, setDisable] = useState(false);

	let tableData = [...tableData, tableValues];

	useEffect(() => {
		console.log(tableValues);
		if (tableValues.length === 3) {
			setDisable(true);
		}
	}, [tableValues]);

	return (
		<>
			<div>
				<div className="flex justify-end mb-4">
					<Button
						color={!disable ? "purple" : "grey"}
						buttonType="filled"
						size="regular"
						rounded={false}
						iconOnly={false}
						ripple="light"
						className="mx-4"
						disabled={disable}
						onClick={() => {
							setShowModal(true);
						}}
						type="button"
					>
						Agregar
					</Button>
				</div>
			</div>
			<NormalidadModal
				showModal={showModal}
				setShowModal={setShowModal}
				titulo={"Agregar Valores"}
				tableValues={tableValues}
				setTableValues={setTableValues}
				setShowModal={setShowModal}
			/>
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div className="overflow-hidden border-b border-gray-200">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-light-blue-500">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
										>
											Genero
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
										>
											Unidad
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
										>
											Edad Minima
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
										>
											Edad Maxima
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
										>
											Referencia Minima
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
										>
											Referencia Maxima
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{tableValues?.map((data) => (
										<tr key={data.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												{data.sexo}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												{data.unidad}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												{data.edadMin}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												{data.edadMax}
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												{data.refMin}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												{data.refMax}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NormalidadTable;
