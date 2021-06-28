//import {useEffect} from 'react';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";
import Checkbox from "@material-tailwind/react/Checkbox";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CustomSelect from "../../layout/utils/CustomSelect";
import SelectDragAndDrop from "./SelectDragAndDrop";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getPruebas } from "../../api/ajustesApi";

const PerfilForm = ({ results, add, update, editData }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		getValues,
		setValue,
	} = useForm({
		defaultValues: {
			codigo: "",
			abreviatura: "",
			descripcion: "",
			titulo: "",
			metodo: "",
			sexo: "",
			notas: "",
			indicaciones: "",
			notasInternas: "",
			alineacionTitulo: "",
			colorTitulo: "",
			ventaIndividual: "",
		},
	});

	const { data: pruebas } = useQuery(["prueba"], getPruebas);

	const [notas, setNotas] = useState(false);
	const [formData, setFormData] = useState("");
	const [step, setStep] = useState(false);
	const [list, setList] = useState([]);

	useEffect(() => {
		if (editData) {
			reset({ ...editData });
			setStep(true);
			setList(editData.bundle);
		}
	}, [editData]);

	const generos = [
		{ _id: 1, descripcion: "Masculino" },
		{
			_id: 2,
			descripcion: "Femenino",
		},
		{ _id: 3, descripcion: "Ambos" },
	];

	const onSubmit = (data) => {
		setFormData(data);
		setStep(true);
	};

	const onFinalSubmit = async (data) => {
		let finalData = { ...formData, bundle: data };
		if (editData) {
			finalData = { ...finalData, id: finalData._id };

			console.log(finalData);
			// dispatch(editPerfil(finalData));
			// setTimeout(() => {
			// 	dispatch(fetchAllPerfiles());
			// }, 1000);
		} else {
			finalData = { ...finalData, precio: 0 };
			await add.mutateAsync(finalData);

			//dispatch(addPerfil(finalData));
		}
		// dispatch(clearSelectPerfil());
		// dispatch(perfil(true));
	};

	return (
		<div className="mt-20">
			<Card>
				<CardHeader color="indigo" contentPosition="center">
					<h2 className="text-2xl text-white">Registo Perfiles</h2>
				</CardHeader>
				<CardBody>
					<div className="flex justify-end mb-4">
						<Button
							color="green"
							buttonType="filled"
							size="regular"
							rounded={false}
							iconOnly={false}
							ripple="light"
							className="mx-4"
							onClick={() => {
								setNotas(!notas);
							}}
							className="flex justify-end"
							type="button"
						>
							Notas
						</Button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid grid-cols-2 gap-5">
							<div>
								<div>
									<Controller
										name="codigo"
										control={control}
										defaultValue=""
										render={({ field: { ref, ...field } }) => (
											<Input
												type="text"
												color="lightBlue"
												size="regular"
												outline={false}
												placeholder="Codigo"
												error={errors.codigo?.message}
												{...field}
											/>
										)}
									/>
								</div>

								<div className="mt-2">
									<Controller
										name="abreviatura"
										control={control}
										defaultValue=""
										render={({ field: { ref, ...field } }) => (
											<Input
												type="text"
												color="lightBlue"
												size="regular"
												outline={false}
												placeholder="Abreviatura"
												error={errors.abreviatura?.message}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="descripcion"
										control={control}
										defaultValue=""
										render={({ field: { ref, ...field } }) => (
											<Input
												type="text"
												color="lightBlue"
												size="regular"
												outline={false}
												placeholder="Descripción"
												error={errors.descripcion?.message}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="ventaIndividual"
										control={control}
										render={({ field: { ref, ...field } }) => (
											<Checkbox
												color="lightBlue"
												text="¿Permitir Venta Invidual?"
												id="ventaIndividual"
												checked={field.value}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="metodo"
										control={control}
										render={({ field: { onChange, ref, ...field } }) => (
											<CustomSelect
												title="Metodo"
												selected={getValues("metodo")}
												setSelected={(selectedMetodo) => {
													setValue("metodo", selectedMetodo);
												}}
												databaseData={results}
												{...field}
											/>
										)}
									/>
								</div>

								<div className="mt-2">
									<Controller
										name="sexo"
										control={control}
										render={({ field: { onChange, ref, ...field } }) => (
											<CustomSelect
												title="Genero"
												selected={getValues("sexo")}
												setSelected={(selectedGenero) => {
													setValue("sexo", selectedGenero);
												}}
												databaseData={generos}
												{...field}
											/>
										)}
									/>
								</div>
							</div>
							<div>
								{notas ? (
									<div>
										<div className="mt-8">
											<Controller
												name="indicaciones"
												control={control}
												render={({ field: { ref, ...field } }) => (
													<Textarea
														color="lightBlue"
														size="regular"
														outline={false}
														placeholder="Indicaciones"
														{...field}
													/>
												)}
											/>
										</div>
										<div className="mt-8">
											<Controller
												name="notas"
												control={control}
												render={({ field: { ref, ...field } }) => (
													<Textarea
														color="lightBlue"
														size="sm"
														outline={false}
														placeholder="Notas"
														{...field}
													/>
												)}
											/>
										</div>

										<div className="mt-7">
											<Controller
												name="notasInternas"
												control={control}
												render={({ field: { ref, ...field } }) => (
													<Textarea
														color="lightBlue"
														size="sm"
														outline={false}
														placeholder="Notas Internas"
														{...field}
													/>
												)}
											/>
										</div>
									</div>
								) : null}
							</div>
						</div>

						{!step ? (
							<div className="flex justify-end mt-2">
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
								>
									Siguiente
								</Button>
							</div>
						) : null}
					</form>
				</CardBody>

				{step ? (
					<SelectDragAndDrop
						onFinalSubmit={onFinalSubmit}
						list={list}
						setList={setList}
						data={pruebas}
					/>
				) : null}
			</Card>
		</div>
	);
};

export default PerfilForm;
