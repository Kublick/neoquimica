import { useState } from "react";
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
import { DevTool } from "@hookform/devtools";

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

const PruebaForm = ({ editData, setEditData, results, add, update }) => {
	const [normalidadTable, setNormalidadTable] = useState(false);
	const [notas, setNotas] = useState(false);
	const [grid, setGrid] = useState(false);
	const [normalidad, setNormalidad] = useState(false);
	const [tableValues, setTableValues] = useState([]);
	const [submitType, setSubmitType] = useState(false);
	const [holdValue, setHoldValue] = useState("");
	const [saveForm, setSaveForm] = useState("");

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

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
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

	const departamentos = results[0].data.map((r) => ({
		value: r._id,
		label: r.descripcion,
	}));

	const metodos = results[1].data.map((r) => ({
		value: r._id,
		label: r.descripcion,
	}));

	const muestras = results[2].data.map((r) => ({
		value: r._id,
		label: r.descripcion,
	}));

	const imprimirOptions = [
		{ value: 1, label: "No Imprimir" },
		{
			value: 2,
			label: "Imprimir solo cuando el parametro se venda individual",
		},
		{ value: 3, label: "Imprimir solo cuando es parte de un perfil" },
		{ value: 4, label: "Imprimir siempre" },
	];

	const generoOptions = [
		{ value: 1, label: "Masculino" },
		{
			value: 2,
			label: "Famenino",
		},
		{ value: 3, label: "Ambos" },
	];

	const tipoResultadoOptions = [
		{ value: 1, label: "Texto" },
		{
			value: 2,
			label: "Numerico",
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
			Sexo: "",
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

	const onSubmit = async (data, e) => {
		if (data.ventaIndividual === "") {
			data = { ...data, ventaIndividual: false };
		}

		if (data.antibiograma === "") {
			data = { ...data, antibiograma: false };
		}

		let formData = {
			...data,
			boldText: data.boldText.value || "",
			departamento: data.departamento.label,
			metodo: data.metodo.label,
			print: data.print.value,
			tipoMuestra: data.tipoMuestra.label,
			tipoResultado: data.tipoResultado.label,
			tipoValorNormalidad: holdValue,
			valorNormalidadTexto: data.valorNormalidadTexto,
			sexo: data.sexo.label,
		};

		if (holdValue === "Texto Libre") {
			add.mutateAsync(saveForm);
			console.log("submitted");
		} else {
			formData = {
				...formData,
				valorNormalidadTexto: "",
				valoresRango: tableValues,
			};

			add.mutateAsync(formData);
		}

		// if (editData) {
		// 	data = { ...editData, ...data };
		// 	await update.mutateAsync(data);
		// } else {
		// 	await add.mutateAsync(data);
		// }
		// setEditData(null);
		// resetForm();
		// setShowModal(false);
	};

	return (
		<div className="mt-20">
			<DevTool control={control} placement={"top-left"} />
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
												placeholder="Clave"
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
												error={errors.unidades?.message}
												{...field}
											/>
										)}
									/>
								</div>
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
							<div>
								<div className="mt-2">
									<Controller
										name="sexo"
										defaultValue="false"
										control={control}
										render={({ field: { ref, ...field } }) => (
											<Select
												options={generoOptions}
												{...field}
												placeholder="Genero"
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="departamento"
										defaultValue="false"
										control={control}
										render={({ field: { ref, ...field } }) => (
											<Select
												options={departamentos}
												placeholder="Departamento"
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="tipoMuestra"
										defaultValue="false"
										control={control}
										render={({ field: { ref, ...field } }) => (
											<Select
												options={muestras}
												placeholder="Tipo Muestra"
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="metodo"
										defaultValue="false"
										control={control}
										render={({ field: { ref, ...field } }) => (
											<Select
												options={metodos}
												placeholder="Metodo"
												{...field}
											/>
										)}
									/>
								</div>
								<div className="mt-2">
									<Controller
										name="print"
										defaultValue="false"
										control={control}
										render={({ field: { ref, ...field } }) => (
											<Select
												options={imprimirOptions}
												{...field}
												placeholder="Imprimir Método"
											/>
										)}
									/>
								</div>

								<div className="mt-2">
									<Controller
										name="boldText"
										defaultValue="false"
										control={control}
										render={({ field: { ref, ...field } }) => (
											<Select
												options={imprimirOptions}
												{...field}
												placeholder="Imprimir Negritas"
											/>
										)}
									/>
									<div className="mt-2">
										<Controller
											name="tipoResultado"
											defaultValue="false"
											control={control}
											render={({ field: { ref, ...field } }) => (
												<Select
													options={tipoResultadoOptions}
													{...field}
													placeholder="Tipo de Resultado"
												/>
											)}
										/>
									</div>
									<div className="mt-2">
										<Controller
											name="tipoValorNormalidad"
											control={control}
											render={({
												field: { onChange, value, ref, ...field },
											}) => (
												<Select
													options={tipoValorNormalidadOption}
													value={tipoValorNormalidadOption.find(
														(c) => c.value === value
													)}
													{...field}
													onChange={checkStatus}
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
									Registrar
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
