import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import Checkbox from "@material-tailwind/react/Checkbox";
import { useMutation, useQueryClient } from "react-query";
import { addTarifa, updateTarifa } from "../../api/ajustesApi";

const schema = yup.object().shape({
	descripcion: yup
		.string()
		.min(3, "Ingrese mínimo 3 caracteres")
		.required("campo requerido"),
});

const TarifaForm = ({ setShowModal, editData, setEditData }) => {
	const queryClient = useQueryClient();

	const agregarMetodo = useMutation(addTarifa, {
		onSuccess: () => {
			queryClient.invalidateQueries("tarifa");
		},
	});

	const update = useMutation(updateTarifa, {
		onSuccess: () => {
			queryClient.invalidateQueries("tarifa");
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			abreviatura: "",
			descripcion: "",
		},
		resolver: yupResolver(schema),
		mode: "onBlur",
	});

	useEffect(() => {
		if (editData !== null) {
			console.log("editData", editData);
			console.log("entro");
			reset({
				descripcion: editData.descripcion,
			});
		} else {
			reset({ descripcion: "" });
		}
	}, [editData, setEditData]);

	const onSubmit = async (data) => {
		if (editData) {
			data = { ...editData, descripcion: data.descripcion };
			await update.mutateAsync(data);
		} else {
			await agregarMetodo.mutateAsync(data);
		}
		setEditData(null);
		reset();
		setShowModal(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="abreviatura"
					control={control}
					render={({ field: { ref, ...field } }) => (
						<Input
							type="text"
							color="lightBlue"
							size="regular"
							outline={false}
							placeholder="Abreviatura"
							{...field}
						/>
					)}
				/>
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
				<div className="mt-2">
					<Controller
						name="isDefault"
						defaultValue="false"
						control={control}
						render={({ field: { ref, ...field } }) => (
							<Checkbox
								color="lightBlue"
								text="¿Es Default?"
								id="isDefault"
								checked={!!field.value}
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
							reset();
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

export default TarifaForm;
