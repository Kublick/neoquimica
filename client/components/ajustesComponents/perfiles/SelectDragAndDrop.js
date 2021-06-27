import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getPruebas } from "../../api/ajustesApi";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@material-tailwind/react/Button";
import Label from "@material-tailwind/react/Label";

const SelectDragAndDrop = ({ onFinalSubmit }) => {
	// const [content, setContent] = useState([]);
	const [list, setList] = useState([]);
	const { data, isLoading, isError, error } = useQuery(["prueba"], getPruebas);

	if (!data) {
		return <p>Cargando...</p>;
	}
	let content = [];
	const prepareContent = () => {
		data.map((p) =>
			content.push({
				value: p._id,
				label: `${p.departamento} > ${p.abreviatura} - ${p.titulo}`,
			})
		);
	};
	prepareContent();

	const handleChange = (data) => {
		setList(data);
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
			<Select
				id="perfiles"
				options={content}
				isMulti
				onChange={handleChange}
				className="px-2 mb-6"
				placeholder="Buscar Prueba"
			/>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="pruebas">
					{(provided) => (
						<ul
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{list.map(({ value, label }, index) => {
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
