import Button from "@material-tailwind/react/Button";
import InputIcon from "@material-tailwind/react/InputIcon";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUsers } from "../../store/authSlice";
import Alert from "@material-tailwind/react/Alert";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
	name: Yup.string().required("El nombre del usuario es obligatorio"),
	password: Yup.string()
		.min(6, "ingrese password mínimo de 6 caracteres")
		.required("El password es obligatorio"),
});

export default function Login() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { serverError, authenticated } = useSelector((state) => state.auth);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: yupResolver(schema),
		shouldFocusError: true,
	});
	const onSubmit = async (data) => {
		dispatch(loginUsers(data));
	};

	useEffect(() => {
		setTimeout(() => {
			dispatch(clearError());
		}, 3000);
	}, [serverError]);

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (token) {
			if (authenticated) {
				router.push("/pacientes");
			} else {
				router.push("/auth/login");
			}
		}
	}, [authenticated]);

	return (
		<div>
			<div className="flex flex-col justify-center h-screen bg-gray-300">
				<div className="relative rounded-lg ">
					<div className="mx-auto bg-white shadow-lg w-96 rounded-xl">
						<div className="w-full p-4 shadow-md rounded-xl">
							<div className="grid items-center justify-center w-full h-24 px-8 py-4 mb-4 -mt-10 text-white bg-gradient-to-tr from-light-blue-500 to-light-blue-700 rounded-xl shadow-lg-light-blue undefined">
								<h1 className="mt-0 mb-2 font-serif text-2xl font-bold leading-normal text-white">
									Ingreso al sistema
								</h1>
							</div>
							<div className="p-4">
								{serverError ? <Alert color="red">{serverError}</Alert> : null}
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="mt-4 mb-8">
										<Controller
											name="name"
											control={control}
											defaultValue=""
											render={({ field: { ref, ...field } }) => (
												<InputIcon
													type="text"
													color="lightBlue"
													size="regular"
													outline={false}
													placeholder="Name"
													iconName="person"
													error={errors.name?.message}
													{...field}
												/>
											)}
										/>
									</div>
									<div className="mb-8">
										<Controller
											name="password"
											control={control}
											defaultValue=""
											render={({ field: { ref, ...field } }) => (
												<InputIcon
													type="password"
													color="lightBlue"
													size="regular"
													outline={false}
													placeholder="Password"
													iconName="lock"
													error={errors.password?.message}
													{...field}
												/>
											)}
										/>
									</div>
									<Button
										color="lightBlue"
										buttonType="filled"
										size="regular"
										rounded={false}
										block={true}
										iconOnly={false}
										ripple="light"
									>
										Login
									</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
