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

const PerfilForm = ({ results }) => {
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
			Sexo: "",
			notas: "",
			indicaciones: "",
			notasInternas: "",
			alineacionTitulo: "",
			colorTitulo: "",
			ventaIndividual: "",
		},
	});

	console.log(results);

	const onSubmit = () => {
		console.log(data);
	};

	return (
		<div className="mt-20">
			<Card>
				<CardHeader color="indigo" contentPosition="center">
					<h2 className="text-2xl text-white">Registo Pruebas</h2>
				</CardHeader>
				<CardBody>
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
						</div>
						<div>2</div>
					</div>
				</CardBody>
				<form onSubmit={handleSubmit(onSubmit)}></form>
			</Card>
		</div>
	);
};

export default PerfilForm;
