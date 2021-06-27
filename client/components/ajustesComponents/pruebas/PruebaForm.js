import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";
import Checkbox from "@material-tailwind/react/Checkbox";
import Select from "react-select";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import NormalidadTable from "./NormalidadTable";
import CustomSelect from "../../layout/utils/CustomSelect";
import { useRouter } from "next/router";

const schema = yup.object().shape({
	codigo: yup
		.string()
		.min(3, "mínimo 3 caracteres")
		.required("campo requerido"),
	abreviatura: yup
		.string()
		.min(3, "mínimo 3 caracteres")
		.required("campo requerido"),
	titulo: yup
		.string()
		.min(3, "mínimo 3 caracteres")
		.required("campo titulo es requerido"),
	descripcion: yup.string().required("el campo descripcion es requerido"),
	unidades: yup.string().required("el campo unidades es requerido"),
});

const PruebaForm = ({
	editData,
	setEditData,
	results,
	add,
	update,
	setShowModal,
	showModal,
}) => {
	const router = useRouter();
	const [normalidadTable, setNormalidadTable] = useState(false);
	const [notas, setNotas] = useState(false);
	const [grid, setGrid] = useState(false);
	const [normalidad, setNormalidad] = useState(false);
	const [tableValues, setTableValues] = useState([]);
	const [submitType, setSubmitType] = useState(false);
	const [holdValue, setHoldValue] = useState("");

	const checkStatus = (e) => {
		if (e.label === "Texto Libre") {
			setNormalidad(true);
			setNormalidadTable(false);
			setSubmitType(false);
		} else if (e.label === "Rango Numerico") {
			setNormalidad(false);
			setNormalidadTable(true);
			setSubmitType(true);
		}
		setHoldValue(e.label);
	};

	useEffect(() => {
		if (editData) {
			reset({
				...editData,
			});
			if (editData.tipoValorNormalidad === "Rango Numerico") {
				setNormalidadTable(true);
				setTableValues(editData.valoresRango);
			} else {
				setNormalidad(true);
				setNormalidadTable(false);
			}
		}
	}, []);

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
			departamento: "",
			tipoMuestra: "",
			metodo: "",
			print: "",
			formula: "",
			boldText: "",
			ventaIndividual: "",
			antibiograma: "",
			unidades: "",
			sexo: "",
			tipoResultado: "",
			decimales: "",
			tiempoProceso: "",
			indicaciones: "",
			notas: "",
			notasInternas: "",
			tipoValorNormalidad: "",
			valorNormalidadTexto: "",
		},
		// resolver: yupResolver(schema),
		mode: "onBlur",
	});

	if (results[0].isLoading || results[1].isLoading || results[2].isLoading) {
		return <h1>Loading</h1>;
	}

	const departamentos = results[0].data;

	const metodos = results[1].data;

	const muestras = results[2].data.map((m) => ({
		_id: m._id,
		descripcion: `${m.descripcion} ${m.nombreTubo}`,
	}));

	const imprimirOptions = [
		{ _id: 1, descripcion: "No Imprimir" },
		{
			_id: 2,
			descripcion: "Imprimir solo cuando el parametro se venda individual",
		},
		{ _id: 3, descripcion: "Imprimir solo cuando es parte de un perfil" },
		{ _id: 4, descripcion: "Imprimir siempre" },
	];

	const generos = [
		{ _id: 1, descripcion: "Masculino" },
		{
			_id: 2,
			descripcion: "Femenino",
		},
		{ _id: 3, descripcion: "Ambos" },
	];

	const tipoResultadoOptions = [
		{ _id: 1, descripcion: "Texto" },
		{
			_id: 2,
			descripcion: "Numerico",
		},
	];

	const tipoValorNormalidadOption = [
		{ value: 1, label: "Texto Libre" },
		{
			value: 2,
			label: "Rango Numerico",
		},
	];

	const resetForm = () => {
		reset({
			codigo: "",
			abreviatura: "",
			descripcion: "",
			titulo: "",
			departamento: "",
			tipoMuestra: "",
			metodo: "",
			print: "",
			formula: "",
			boldText: "",
			ventaIndividual: "",
			antibiograma: "",
			unidades: "",
			sexo: "",
			tipoResultado: "",
			decimales: "",
			tiempoProceso: "",
			indicaciones: "",
			notas: "",
			notasInternas: "",
			tipoValorNormalidad: "",
			valorNormalidadTexto: "",
		});
	};

	const onSubmit = async (data) => {
		data = {
			...data,
			tipoValorNormalidad: holdValue,
		};

		if (editData) {
			if (holdValue === "Rango Numerico") {
				data = {
					...data,
					valorNormalidadTexto: "",
					valoresRango: tableValues,
				};
			}
			data = { ...editData, ...data };
			await update.mutateAsync(data);
		} else {
			if (data.ventaIndividual === true) {
				data = { ...data, precio: 0 };
			}

			if (data.antibiograma === "") {
				data = { ...data, antibiograma: false };
			}

			if (holdValue === "Texto Libre") {
				data = {
					...data,
					valoresRango: "",
				};
				await add.mutateAsync(data);
			}

			if (holdValue === "Rango Numerico") {
				data = {
					...data,
					valorNormalidadTexto: "",
					valoresRango: tableValues,
				};
				await add.mutateAsync(data);
			}
		}
		setEditData(null);
		resetForm();
		// redirect();
	};

	const redirect = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="mt-20">
			<Card>
				<CardHeader color="indigo" contentPosition="center">
					<h2 className="text-2xl text-white">Registo Pruebas</h2>
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
								setGrid(!grid);
							}}
							className="flex justify-end"
							type="button"
						>
							Notas
						</Button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div
							className={`grid ${!grid ? `grid-cols-2` : `grid-cols-3`} gap-5`}
						>
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
										name="titulo"
										control={control}
										defaultValue=""
										render={({ field: { ref, ...field } }) => (
											<Input
												type="text"
												color="lightBlue"
												size="regular"
												outline={false}
												placeholder="Titulo"
												error={errors.titulo?.message}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="departamento"
										control={control}
										render={({ field: { onChange, ref, ...field } }) => (
											<CustomSelect
												key={"depto"}
												title="Deparmento"
												selected={getValues("departamento")}
												setSelected={(selectedDepartment) => {
													setValue("departamento", selectedDepartment);
												}}
												databaseData={departamentos}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="tipoMuestra"
										control={control}
										render={({ field: { onChange, ref, ...field } }) => (
											<CustomSelect
												key={"muestra"}
												title="Tipo Muestra"
												selected={getValues("tipoMuestra")}
												setSelected={(selectedTipoMuestra) => {
													setValue("tipoMuestra", selectedTipoMuestra);
												}}
												databaseData={muestras}
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
												databaseData={metodos}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="print"
										control={control}
										render={({ field: { onChange, ref, ...field } }) => (
											<CustomSelect
												title="Imprimir Metodo en resultado"
												selected={getValues("print")}
												setSelected={(selectPrint) => {
													setValue("print", selectPrint);
												}}
												databaseData={imprimirOptions}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="formula"
										control={control}
										defaultValue=""
										render={({ field: { ref, ...field } }) => (
											<Input
												type="text"
												color="lightBlue"
												size="regular"
												outline={false}
												placeholder="Formula"
												{...field}
											/>
										)}
									/>
								</div>

								<div className="mt-2">
									<Controller
										name="boldText"
										control={control}
										render={({ field: { onChange, ref, ...field } }) => (
											<CustomSelect
												title="¿Imprimir en negritas?"
												selected={getValues("boldText")}
												setSelected={(selectBoldText) => {
													setValue("boldText", selectBoldText);
												}}
												databaseData={imprimirOptions}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="flex justify-between">
									<div className="mt-2">
										<Controller
											name="antibiograma"
											defaultValue="false"
											checked={status}
											control={control}
											render={({ field: { ref, ...field } }) => (
												<Checkbox
													color="lightBlue"
													text="¿Permite Antibiograma?"
													id="antibiograma"
													checked={field.value}
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
								</div>
							</div>
							<div>
								<div>
									<Controller
										name="unidades"
										control={control}
										defaultValue=""
										render={({ field: { ref, ...field } }) => (
											<Input
												type="text"
												color="lightBlue"
												size="regular"
												outline={false}
												placeholder="Unidades"
												error={errors.unidades?.message}
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
								<div className="mt-2">
									<Controller
										name="tipoResultado"
										control={control}
										render={({ field: { onChange, ref, ...field } }) => (
											<CustomSelect
												title="Tipo Resultado"
												selected={getValues("tipoResultado")}
												setSelected={(tipoResultado) => {
													setValue("tipoResultado", tipoResultado);
												}}
												databaseData={tipoResultadoOptions}
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="decimales"
										control={control}
										defaultValue=""
										render={({ field: { ref, ...field } }) => (
											<Input
												type="number"
												color="lightBlue"
												size="regular"
												outline={false}
												placeholder="Decimales"
												{...field}
											/>
										)}
									/>
								</div>

								<div>
									<div className="mt-2">
										<Controller
											name="tipoValorNormalidad"
											control={control}
											render={({
												field: { onChange, value, ref, ...field },
											}) => (
												<Select
													options={tipoValorNormalidadOption}
													{...field}
													value={tipoValorNormalidadOption.filter(
														(option) =>
															option.label === getValues("tipoValorNormalidad")
													)}
													onChange={(e) => {
														setValue("tipoValorNormalidad", e.label);
														checkStatus(e);
													}}
													placeholder="Valor Normalidad"
												/>
											)}
										/>
									</div>
									{normalidad ? (
										<div className="mt-8">
											<Controller
												name="valorNormalidadTexto"
												control={control}
												render={({ field: { ref, ...field } }) => (
													<Textarea
														color="lightBlue"
														size="regular"
														outline={false}
														placeholder="Valor Normalidad Texto"
														{...field}
													/>
												)}
											/>
										</div>
									) : null}
								</div>
							</div>
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
						{!submitType ? (
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
										redirect();
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
					{normalidadTable ? (
						<div className="mt-4">
							<Card>
								<NormalidadTable
									tableValues={tableValues}
									setTableValues={setTableValues}
								/>
							</Card>
							<div className="flex justify-end mt-6">
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
										redirect();
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
									onClick={handleSubmit(onSubmit)}
								>
									Registrar
								</Button>
							</div>
						</div>
					) : null}
				</CardBody>
			</Card>
		</div>
	);
};

export default PruebaForm;
