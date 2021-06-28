import { useEffect, useState } from "react";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@material-tailwind/react/Button";
import Label from "@material-tailwind/react/Label";

const SelectDragAndDrop = ({ onFinalSubmit, list, setList, data }) => {
	const [container, setContainer] = useState(list);
	const [results, setResults] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		let content = [];
		const prepareContent = () => {
			const items = data.map((p) => ({
				id: p._id,
				value: `${p.departamento} > ${p.abreviatura} - ${p.titulo}`,
			}));
			setFilteredData(items);
		};
		prepareContent();
	}, []);

	const filterStuff = () => {
		let filter = results.filter(
			({ value: id1 }) => !container.some(({ value: id2 }) => id2 === id1)
		);
		setFilteredData(filter);
	};

	const handleChange = (data) => {
		let found = results.find((d) => d.value === data);
		let array = [...container, found];
		setContainer(array);
		y;
	};

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(list);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setList(items);
	}

	const finalSubmit = () => {
		onFinalSubmit(list);
	};

	return (
		<>
			<label className="ml-3 text-xs">Agregar Prueba</label>

			<select onChange={(e) => handleChange(e.target.value)}>
				{filteredData.map((c) => (
					<option key={c.value} value={c.value}>
						{c.label}
					</option>
				))}
			</select>

			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="pruebas">
					{(provided) => (
						<ul
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{container.map(({ value, label }, index) => {
								return (
									<Draggable key={value} draggableId={value} index={index}>
										{(provided) => (
											<li
												className="py-1"
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<Label color="teal">{label}</Label>
											</li>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			<div className="flex justify-end">
				<Button
					color="red"
					buttonType="filled"
					size="regular"
					rounded={false}
					iconOnly={false}
					ripple="light"
					className="mx-4"
					onClick={(e) => {
						resetForm();
						setEditData(null);
					}}
					type="button"
				>
					Cancelar
				</Button>
				<Button
					color="lightBlue"
					buttonType="filled"
					size="regular"
					rounded={false}
					iconOnly={false}
					ripple="light"
					className="mx-4"
					type="button"
					onClick={finalSubmit}
				>
					Registrar
				</Button>
			</div>
		</>
	);
};

export default SelectDragAndDrop;
