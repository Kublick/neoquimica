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
	const { _id } = data;
	try {
		let res = await axiosClient.put(`api/config/departamento/${_id}`, data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const addMuestra = async (data) => {
	try {
		let res = await axiosClient.post("api/config/muestra", data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const getMuestras = async () => {
	try {
		let res = await axiosClient("api/config/muestra");
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const updateMuestra = async (data) => {
	const { _id } = data;
	try {
		let res = await axiosClient.put(`api/config/muestra/${_id}`, data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const addPrueba = async (data) => {
	try {
		let res = await axiosClient.post("api/config/prueba", data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const getPruebas = async () => {
	try {
		let res = await axiosClient("api/config/prueba");
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const updatePrueba = async (data) => {
	const { _id } = data;
	try {
		let res = await axiosClient.put(`api/config/prueba/${_id}`, data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const addPerfil = async (data) => {
	try {
		let res = await axiosClient.post("api/config/perfil", data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const getPerfiles = async () => {
	try {
		let res = await axiosClient("api/config/perfil");
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};

export const updatePerfil = async (data) => {
	const { _id } = data;
	try {
		let res = await axiosClient.put(`api/config/perfil/${_id}`, data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};
