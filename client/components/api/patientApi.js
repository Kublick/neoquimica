import axiosClient from "../../config/axios";
import Swal from "sweetalert2";

export const getAllPatients = async () => {
	try {
		let res = await axiosClient("api/patients");
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const addUser = async (data) => {
	console.log(data);
	try {
		const res = await axiosClient.post("/api/patients", data);
		let newUser = data.name + " " + data.lastName;
		Swal.fire(`Paciente ${newUser} Creado `, "", "success");
		return res.data;
	} catch (error) {
		// Swal.fire(`Hubo un error `, error.response.data, "success");
		console.log(error);
	}
};

export const deleteUser = async (id) => {
	try {
		const res = await axiosClient.delete(`/api/patients/${id}`);
		return res.data;
	} catch (error) {
		// Swal.fire(`Hubo un error `, error.response.data, "success");
		console.log(error);
	}
};

export const updateUser = async (data) => {
	const id = data.id;

	try {
		await axiosClient.put(`/api/patients/${id}`, data);

		return data;
	} catch (error) {
		// Swal.fire(`Hubo un error `, error.response.data, "success");
		console.log(error);
	}
};
