import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";
import Checkbox from "@material-tailwind/react/Checkbox";
import { useMutation, useQueryClient, useQueries } from "react-query";
import {
	addMuestra,
	getDepartamentos,
	getMetodos,
	getMuestras,
	updateMuestra,
} from "../../api/ajustesApi";
import Select from "react-select";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import NormalidadTable from "./NormalidadTable";

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

const PruebaForm = ({ setShowModal, editData, setEditData }) => {
	const [normalidadTable, setNormalidadTable] = useState(false);
	const [notas, setNotas] = useState(false);
	const [grid, setGrid] = useState(false);
	const [normalidad, setNormalidad] = useState(false);
	const [tableValues, setTableValues] = useState([]);

	const checkStatus = (e) => {
		if (e.label === "Texto Libre") {
			setNormalidad(true);
			setNormalidadTable(false);
		} else if (e.label === "Rango Numerico") {
			setNormalidad(false);
			setNormalidadTable(true);
		}
	};

	const queryClient = useQueryClient();

	const results = useQueries([
		{ queryKey: ["departamentos"], queryFn: getDepartamentos },
		{ queryKey: ["metodo"], queryFn: getMetodos },
		{ queryKey: ["muestra"], queryFn: getMuestras },
	]);

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
			boldtext: "",
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

	// const add = useMutation(addMuestra, {
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries("muestra");
	// 	},
	// });

	// const update = useMutation(updateMuestra, {
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries("muestra");
	// 	},
	// });

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
			boldtext: "",
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
		console.log(data);

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
										name="boldtext"
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
											defaultValue="false"
											control={control}
											onChange={checkStatus}
											render={({ onChange, field: { ref, ...field } }) => (
												<Select
													options={tipoValorNormalidadOption}
													{...field}
													placeholder="Valor Normalidad"
													onChange={checkStatus}
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
					</form>
				</CardBody>
				{normalidadTable ? (
					<div className="mt-4">
						<Card>
							<NormalidadTable
								tableValues={tableValues}
								setTableValues={setTableValues}
							/>
						</Card>
					</div>
				) : null}
			</Card>
		</div>
	);
};

export default PruebaForm;
