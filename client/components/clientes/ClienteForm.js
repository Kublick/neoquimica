import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Card from "@material-tailwind/react/Card";
import { useQuery, useQueryClient } from "react-query";
import { getTarifas } from "../api/ajustesApi";
import CustomSelect from "../layout/utils/CustomSelect";
import { useEffect } from "react";

const ClienteForm = ({ setShowModal, editData, setEditData, add, update }) => {
	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		reset,
	} = useForm({
		defaultValues: {
			shortId: "",
			nombre: "",
			tarifa: "",
			email: "",
			telefono: "",
			direccion: "",
			tipoPago: "",
			rfc: "",
			notes: "",
			envio: [],
			webLabLogin: "",
			webLabPassword: "",
			listaPrecios: [],
		},
		//resolver: yupResolver(schema),
		mode: "onBlur",
	});

	useEffect(() => {
		reset({ ...editData });
		console.log(editData);
	}, []);

	const onSubmit = (data) => {
		if (editData) {
			update.mutateAsync(data);
		} else {
			add.mutateAsync(data);
		}

		resetForm();
	};

	const { data: tarifaData, error } = useQuery(["tarifa"], getTarifas);

	if (!tarifaData) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.log(error);
		return;
	}
	const tarifas = tarifaData.map((t) => ({
		_id: t._id,
		descripcion: `${t.descripcion}`,
	}));

	const tipoPagos = [
		{ _id: 1, descripcion: "Contado" },
		{
			_id: 2,
			descripcion: "Credito",
		},
	];

	const resetForm = () => {
		reset();
		setEditData(null);
		setShowModal(false);
	};

	return (
		<div className="mt-4">
			<Card>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<Controller
							name="shortId"
							control={control}
							render={({ field: { ref, ...field } }) => (
								<Input
									type="text"
									color="lightBlue"
									size="regular"
									outline={false}
									placeholder="ID"
									error={errors.shortId?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div className="mt-2">
						<Controller
							name="nombre"
							control={control}
							render={({ field: { ref, ...field } }) => (
								<Input
									type="text"
									color="lightBlue"
									size="regular"
									outline={false}
									placeholder="Nombre"
									error={errors.shortId?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div className="mt-2">
						<Controller
							name="email"
							control={control}
							render={({ field: { ref, ...field } }) => (
								<Input
									type="text"
									color="lightBlue"
									size="regular"
									outline={false}
									placeholder="Email"
									error={errors.email?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div className="mt-2">
						<Controller
							name="telefono"
							control={control}
							render={({ field: { ref, ...field } }) => (
								<Input
									type="text"
									color="lightBlue"
									size="regular"
									outline={false}
									placeholder="Telefono"
									error={errors.telefono?.message}
									{...field}
								/>
							)}
						/>
					</div>
					<div className="mt-2">
						<Controller
							name="direccion"
							control={control}
							render={({ field: { ref, ...field } }) => (
								<Input
									type="text"
									color="lightBlue"
									size="regular"
									outline={false}
									placeholder="Direccion"
									error={errors.direccion?.message}
									{...field}
								/>
							)}
						/>
						<div className="mt-2">
							<Controller
								name="rfc"
								control={control}
								render={({ field: { ref, ...field } }) => (
									<Input
										type="text"
										color="lightBlue"
										size="regular"
										outline={false}
										placeholder="RFC"
										error={errors.rfc?.message}
										{...field}
									/>
								)}
							/>
						</div>
						<div className="mt-2">
							<Controller
								name="tarifa"
								control={control}
								render={({ field: { onChange, ref, ...field } }) => (
									<CustomSelect
										key={"tarifa"}
										title="Tarfia"
										selected={getValues("tarifa")}
										setSelected={(s) => {
											setValue("tarifa", s);
										}}
										databaseData={tarifas}
										{...field}
									/>
								)}
							/>
						</div>
						<div className="mt-2">
							<Controller
								name="tipoPago"
								control={control}
								render={({ field: { onChange, ref, ...field } }) => (
									<CustomSelect
										key={"tipoPago"}
										title="Tipo Pago"
										selected={getValues("tipoPago")}
										setSelected={(s) => {
											setValue("tipoPago", s);
										}}
										databaseData={tipoPagos}
										{...field}
									/>
								)}
							/>
						</div>
					</div>
					<div className="flex justify-end mt-4">
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
				</form>
			</Card>
		</div>
	);
};

export default ClienteForm;
