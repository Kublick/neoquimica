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
	console.log("en api", data);

	const { _id } = data;
	try {
		let res = await axiosClient.put(`api/config/metodo/${_id}`, data);
		return res.data;
	} catch (error) {
		console.log(error.response);
	}
};
