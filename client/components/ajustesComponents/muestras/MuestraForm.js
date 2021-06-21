import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";
import Checkbox from "@material-tailwind/react/Checkbox";
import { useMutation, useQueryClient } from "react-query";
import { addMuestra, updateMuestra } from "../../api/ajustesApi";

const schema = yup.object().shape({
	descripcion: yup
		.string()
		.min(3, "Ingrese mínimo 3 caracteres")
		.required("campo requerido"),
	clave: yup.string().required("Es un campo requerido"),
});

const MetodoForm = ({ setShowModal, editData, setEditData }) => {
	const queryClient = useQueryClient();

	const agregarMetodo = useMutation(addMuestra, {
		onSuccess: () => {
			queryClient.invalidateQueries("muestra");
		},
	});

	const update = useMutation(updateMuestra, {
		onSuccess: () => {
			queryClient.invalidateQueries("muestra");
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			descripcion: "",
			clave: "",
			nombreTubo: "",
			observaciones: "",
			codigoBarras: false,
			excluirStatus: false,
		},
		resolver: yupResolver(schema),
		mode: "onBlur",
	});

	useEffect(() => {
		const clearData = () => {
			if (editData !== null) {
				reset({
					...editData,
				});
			} else {
				resetForm();
			}
		};

		clearData();
	}, [editData, setEditData]);

	const resetForm = () => {
		reset({
			descripcion: "",
			clave: "",
			nombreTubo: "",
			observaciones: "",
			codigoBarras: false,
			excluirStatus: false,
		});
	};

	const onSubmit = async (data, e) => {
		if (editData) {
			data = { ...editData, ...data };
			await update.mutateAsync(data);
		} else {
			await agregarMetodo.mutateAsync(data);
		}
		setEditData(null);
		resetForm();
		setShowModal(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="clave"
					control={control}
					defaultValue=""
					render={({ field: { ref, ...field } }) => (
						<Input
							type="text"
							color="lightBlue"
							size="regular"
							outline={false}
							placeholder="Clave"
							error={errors.clave?.message}
							{...field}
						/>
					)}
				/>
				<div className="mt-6">
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
				<div className="mt-6">
					<Controller
						name="nombreTubo"
						control={control}
						defaultValue=""
						render={({ field: { ref, ...field } }) => (
							<Input
								type="text"
								color="lightBlue"
								size="regular"
								outline={false}
								placeholder="Nombre Tubo"
								{...field}
							/>
						)}
					/>
				</div>
				<div className="mt-6">
					<Controller
						name="observaciones"
						control={control}
						render={({ field: { ref, ...field } }) => (
							<Textarea
								color="lightBlue"
								size="regular"
								outline={false}
								placeholder="Observaciones"
								{...field}
							/>
						)}
					/>
				</div>
				<div className="mt-6">
					<Controller
						name="codigoBarras"
						defaultValue="false"
						checked={status}
						control={control}
						render={({ field: { ref, ...field } }) => (
							<Checkbox
								color="lightBlue"
								text="¿Imprimir codigo de barras?"
								id="codigoBarras"
								checked={field.value}
								{...field}
							/>
						)}
					/>
				</div>
				<div className="mt-2">
					<Controller
						name="excluirStatus"
						control={control}
						render={({ field: { ref, ...field } }) => (
							<Checkbox
								color="lightBlue"
								text="¿Excluir Status?"
								id="excluirStatus"
								checked={field.value}
								{...field}
							/>
						)}
					/>
				</div>
				<div className="flex justify-end mt-8">
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
						Registar
					</Button>
				</div>
			</form>
		</>
	);
};

export default MetodoForm;
