import axiosClient from "../../config/axios";

export const addMetodo = async (data) => {
	try {
		let res = await axiosClient.post("api/config/metodo", data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const getMetodos = async () => {
	try {
		let res = await axiosClient("api/config/metodo");
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const updateMetodo = async (data) => {
	const { _id } = data;
	try {
		let res = await axiosClient.put(`api/config/metodo/${_id}`, data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const addDepartamento = async (data) => {
	console.log("added depto");
	try {
		let res = await axiosClient.post("api/config/departamento", data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const getDepartamentos = async () => {
	try {
		let res = await axiosClient("api/config/departamento");
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const updateDepartamento = async (data) => {
	console.log("update depto");
	const { _id } = data;
	try {
		let res = await axiosClient.put(`api/config/departamento/${_id}`, data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};
