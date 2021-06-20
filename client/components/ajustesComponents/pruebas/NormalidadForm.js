import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
	sexo: yup.string().required("campo genero requerido"),
	unidad: yup.string().required("campo unidad requerido"),
	edadMin: yup
		.number("campo numerico requerido")
		.required("campo numerico requerido"),
	edadMax: yup
		.number("campo numerico requerido")
		.required("campo numerico requerido"),
	refMax: yup
		.number("campo numerico requerido")
		.required("campo numerico requerido"),
	refMin: yup
		.number("campo numerico requerido")
		.required("campo numerico requerido"),
});

const ValorNormalidad = ({ tableValues, setTableValues, setShowModal }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: "",
			sexo: "",
			unidad: "",
			edadMin: "",
			edadMax: "",
			refMin: "",
			refMax: "",
		},
		//resolver: yupResolver(schema),
		mode: "onBlur",
	});

	const onSubmit = (data) => {
		console.log(data);

		// const newData = {
		// 	edadMax: data.edadMax,
		// 	edadMin: data.edadMin,
		// 	refMax: data.refMax,
		// 	refMin: data.refMin,
		// 	sexo: data.sexo.label,
		// 	unidad: data.unidad.label,
		// 	id: Math.floor(Math.random(10) * 1000),
		// };
		// const tableArray = [...tableValues, newData];
		// setTableValues(tableArray);
		// setShowModal(false);
	};

	const optionsSexo = [
		{ value: 1, label: "Masculino" },
		{
			value: 2,
			label: "Femenino",
		},
		{ value: 3, label: "Ambos" },
	];

	const optionsUnidad = [
		{ value: 1, label: "Años" },
		{
			value: 2,
			label: "Días",
		},
	];

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col space-y-4">
					<div>
						<div className="mt-4">
							<Controller
								name="sexo"
								control={control}
								render={({ field: { ref, ...field } }) => (
									<Select
										options={optionsSexo}
										placeholder="Genero"
										{...field}
									/>
								)}
							/>
						</div>
						<div className="mt-4">
							<Controller
								name="unidad"
								control={control}
								render={({ field: { ref, ...field } }) => (
									<Select
										options={optionsUnidad}
										placeholder="Unidad"
										{...field}
									/>
								)}
							/>
						</div>
						<div className="mt-4">
							<Controller
								name="edadMin"
								control={control}
								defaultValue=""
								render={({ field: { ref, ...field } }) => (
									<Input
										type="number"
										color="lightBlue"
										size="regular"
										outline={false}
										placeholder="Edad Mínima"
										error={errors.edadMin?.message}
										{...field}
									/>
								)}
							/>
						</div>
						<div className="mt-4">
							<Controller
								name="edadMax"
								control={control}
								defaultValue=""
								render={({ field: { ref, ...field } }) => (
									<Input
										type="number"
										color="lightBlue"
										size="regular"
										outline={false}
										placeholder="Edad Maxima"
										error={errors.edadMax?.message}
										{...field}
									/>
								)}
							/>
						</div>
						<div className="mt-4">
							<Controller
								name="refMin"
								control={control}
								defaultValue=""
								render={({ field: { ref, ...field } }) => (
									<Input
										type="number"
										color="lightBlue"
										size="regular"
										outline={false}
										placeholder="Referencia Minima"
										error={errors.refMin?.message}
										{...field}
									/>
								)}
							/>
						</div>
						<div className="mt-4">
							<Controller
								name="refMax"
								control={control}
								defaultValue=""
								render={({ field: { ref, ...field } }) => (
									<Input
										type="number"
										color="lightBlue"
										size="regular"
										outline={false}
										placeholder="Referencia Maxima"
										error={errors.refMax?.message}
										{...field}
									/>
								)}
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end mt-8">
					<Button
						color="lightBlue"
						buttonType="filled"
						size="regular"
						rounded={false}
						iconOnly={false}
						ripple="light"
						className="mx-4"
						type="button"
					>
						Registar
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ValorNormalidad;
