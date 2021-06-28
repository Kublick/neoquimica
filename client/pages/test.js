import Downshift from "downshift";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getPruebas } from "../components/api/ajustesApi";

const test = () => {
	const { data } = useQuery(["prueba"], getPruebas);

	if (!data) {
		return <p>Wait</p>;
	}

	const items = data.map((p) => ({
		id: p._id,
		value: `${p.departamento} > ${p.abreviatura} - ${p.titulo}`,
	}));

	console.log(items);

	return (
		<div className="m-10">
			<Downshift
				onChange={(selection) =>
					alert(
						selection ? `You selected ${selection.value}` : "Selection Cleared"
					)
				}
				itemToString={(item) => (item ? item.value : "")}
			>
				{({
					getInputProps,
					getItemProps,
					getLabelProps,
					getMenuProps,
					isOpen,
					inputValue,
					highlightedIndex,
					selectedItem,
					getRootProps,
				}) => (
					<div>
						<label {...getLabelProps()}>Busquea Prueba</label>
						<div
							style={{ display: "inline-block" }}
							{...getRootProps({}, { suppressRefError: true })}
						>
							<input {...getInputProps()} />
						</div>
						<ul {...getMenuProps()}>
							{isOpen
								? items
										.filter(
											(item) => !inputValue || item.value.includes(inputValue)
										)
										.map((item, index) => (
											<li
												{...getItemProps({
													key: item.value,
													index,
													item,
													style: {
														backgroundColor:
															highlightedIndex === index
																? "lightgray"
																: "white",
														fontWeight:
															selectedItem === item ? "bold" : "normal",
													},
												})}
											>
												{item.value}
											</li>
										))
								: null}
						</ul>
					</div>
				)}
			</Downshift>
		</div>
	);
};

export default test;
