import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import { useMutation, useQueryClient } from "react-query";
import { addMetodo, updateMetodo } from "../../api/ajustesApi";

const schema = yup.object().shape({
	descripcion: yup
		.string()
		.min(3, "Ingrese mínimo 3 caracteres")
		.required("campo requerido"),
});

const MetodoForm = ({ setShowModal, editData }) => {
	const queryClient = useQueryClient();

	const agregarMetodo = useMutation(addMetodo, {
		onSuccess: () => {
			queryClient.invalidateQueries("metodo");
		},
	});

	const update = useMutation(updateMetodo, {
		onSuccess: () => {
			queryClient.invalidateQueries("metodo");
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
		},
		resolver: yupResolver(schema),
		mode: "onBlur",
	});

	useEffect(() => {
		if (editData) {
			reset({
				descripcion: editData.descripcion,
			});
		}
	}, [editData]);

	const onSubmit = async (data) => {
		if (editData) {
			data = { ...editData, descripcion: data.descripcion };
			await update.mutateAsync(data);
		} else {
			await agregarMetodo.mutateAsync(data);
		}
		reset();
		setShowModal(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<div className="flex justify-end mt-8">
					<Button
						color="red"
						buttonType="filled"
						size="regular"
						rounded={false}
						iconOnly={false}
						ripple="light"
						className="mx-4"
						onClick={(e) => setShowModal(false)}
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
