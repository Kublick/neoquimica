import axiosClient from "./axios";

const tokenAuth = (token) => {
	if (token) {
		axiosClient.defaults.headers.common = { Authorization: `bearer ${token}` };
	} else {
		delete axiosClient.defaults.headers.common["Authorization: Bearer"];
	}
};

export default tokenAuth;
