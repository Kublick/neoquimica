import { useForm, Controller } from "react-hook-form";
import Input from "@material-tailwind/react/Input";
import CardHeader from "@material-tailwind/react/CardHeader";
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import { useEffect, useState } from "react";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";
import SelectDrag from "./SelectDrag";

const PaqueteForm = ({ add, update, results, editData, setShowModal }) => {
	const [list, setList] = useState([]);
	const [step, setStep] = useState(false);
	const [formData, setFormData] = useState("");
	const [fieldData, setFieldData] = useState([]);

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			abreviatura: "",
			descripcion: "",
			indicaciones: "",
			notasInternas: "",
		},
		//resolver: yupResolver(schema),
		mode: "onBlur",
	});

	useEffect(() => {
		if (!results) {
			return <p>Loading...</p>;
		}

		const pruebas = results[0].data;
		const perfiles = results[1].data;

		let content = [];
		perfiles.map((p) =>
			content.push({
				value: p._id,
				label: `Perfil > ${p.descripcion} - ${p.metodo}`,
			})
		);
		pruebas.map((p) =>
			content.push({
				value: p._id,
				label: `Prueba > ${p.titulo} - ${p.metodo}`,
			})
		);
		setFieldData(content);
	}, []);

	useEffect(() => {
		console.log("editData", editData);
		if (editData) {
			reset({ ...editData });
		}

		setList(editData.bundle);
	}, []);

	const resetForm = () => {
		reset();
	};

	const onSubmit = (data) => {
		setFormData(data);
		setStep(true);
	};

	const onFinalSubmit = (data) => {
		let finalData = { ...formData, bundle: data };
		if (editData) {
			finalData = { ...finalData };
			update.mutateAsync(finalData);
		} else {
			finalData = { ...finalData, precio: 0 };
			add.mutateAsync(finalData);
		}
		// resetForm();
		// setShowModal(false);
	};

	return (
		<div className="mt-20">
			<Card>
				<CardHeader>
					<h2 className="text-2xl text-white">Registro Paquetes</h2>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
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
										placeholder="Descripcion"
										error={errors.descripcion?.message}
										{...field}
									/>
								)}
							/>
						</div>
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
								name="notasInternas"
								control={control}
								render={({ field: { ref, ...field } }) => (
									<Textarea
										color="lightBlue"
										size="regular"
										outline={false}
										placeholder="Notas Internas"
										{...field}
									/>
								)}
							/>
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
									onClick={() => {
										resetForm();
										setShowModal(false);
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
					<SelectDrag
						onFinalSubmit={onFinalSubmit}
						data={fieldData}
						resetForm={resetForm}
						list={list}
					/>
				) : null}
			</Card>
		</div>
	);
};

export default PaqueteForm;
