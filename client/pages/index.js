import Button from "@material-tailwind/react/Button";
import InputIcon from "@material-tailwind/react/InputIcon";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function Home() {
	const { control, handleSubmit, register } = useForm();
	const onSubmit = (data) => {
		try {
			const auth = axios.post("localhost:4000/auth/login", data);
			console.log(auth);
		} catch (error) {
			console.log(error);
		}
	};
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
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="mb-8">
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
													iconName="person"
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
