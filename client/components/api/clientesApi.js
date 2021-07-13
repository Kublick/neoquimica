import axiosClient from "../../config/axios";

export const getAllClientes = async () => {
	try {
		let res = await axiosClient("api/clientes");
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const addCliente = async (data) => {
	try {
		const res = await axiosClient.post("/api/clientes", data);
		let newUser = data.name + " " + data.lastName;
		//	Swal.fire(`Paciente ${newUser} Creado `, "", "success");
		return res.data;
	} catch (error) {
		// Swal.fire(`Hubo un error `, error.response.data, "success");
		console.log(error);
	}
};

export const deleteClient = async (id) => {
	try {
		const res = await axiosClient.delete(`/api/clientes/${id}`);
		return res.data;
	} catch (error) {
		// Swal.fire(`Hubo un error `, error.response.data, "success");
		console.log(error);
	}
};

export const updateCliente = async (data) => {
	const id = data._id;
	try {
		await axiosClient.put(`/api/clientes/${id}`, data);

		return data;
	} catch (error) {
		// Swal.fire(`Hubo un error `, error.response.data, "success");
		console.log(error);
	}
};
