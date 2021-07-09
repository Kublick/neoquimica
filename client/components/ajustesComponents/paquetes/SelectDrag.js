//import Selector from "../components/layout/utils/Selector";
import { useState, useRef } from "react";
import Select from "react-select";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

const SelectDrag = ({ data, onFinalSubmit, resetForm, list }) => {
	const [selected, setSelected] = useState(list);

	const refSelect = useRef();

	function handleSelectChange(values) {
		setSelected(values);
	}

	function handleRemoveValue(e) {
		const { name: buttonName } = e.currentTarget;
		const removedValue = selected.find((val) => val.value === buttonName);
		refSelect.current.onChange(
			selected.filter((val) => val.value !== buttonName),
			{ name, action: "remove-value", removedValue }
		);
	}

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(selected);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setSelected(items);
	}

	const finalSubmit = () => {
		onFinalSubmit(selected);
	};

	return (
		<div className="m-8">
			<Select
				placeholder="Buscar"
				instanceId="perfiles"
				ref={refSelect}
				options={data}
				isMulti
				value={selected}
				onChange={handleSelectChange}
				controlShouldRenderValue={false}
			/>

			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="perfiles">
					{(provided) => (
						<ul
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{selected?.map(({ value, label }, index) => {
								return (
									<Draggable key={value} draggableId={value} index={index}>
										{(provided) => (
											<li
												className="py-1"
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<div className="grid grid-cols-2 mt-4">
													<div className="p-2 mx-2 text-white bg-green-600 rounded-2xl">
														<p className="mx-2">{label}</p>
													</div>
													<div className="self-center ml-2">
														<Button
															color="red"
															buttonType="filled"
															size="sm"
															rounded={true}
															block={false}
															iconOnly={true}
															ripple="light"
															name={value}
															onClick={handleRemoveValue}
														>
															<Icon
																name="close"
																size="sm"
																onClick={handleRemoveValue}
															/>
														</Button>
													</div>
												</div>
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
			<div className="flex justify-end mt-4">
				<Button
					color="red"
					buttonType="filled"
					size="regular"
					rounded={false}
					iconOnly={false}
					ripple="light"
					className="mx-4"
					onClick={() => {
						resetForm();
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
		</div>
	);
};

export default SelectDrag;
