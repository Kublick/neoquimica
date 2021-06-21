import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios";
import tokenAuth from "../config/tokenAuth";

export const loginUsers = createAsyncThunk(
	"employee/login",
	async (data, { dispatch, rejectWithValue }) => {
		try {
			const res = await axiosClient.post("/api/auth/login", data);
			localStorage.setItem("token", res.data.accessToken);
			dispatch(authEmployee());
			return res.data;
		} catch (error) {
			return rejectWithValue(error.response.data.message);
		}
	}
);

export const authEmployee = createAsyncThunk(
	"employee/validate token",
	async () => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const res = await axiosClient.post("/api/auth/login", token);
			console.log(res.data);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
		authenticated: null,
		id: false,
		name: "",
		role: "",
		serverError: "",
		token: "",
	},
	reducers: {
		clearError: (state) => {
			state.serverError = null;
		},
	},
	extraReducers: {
		[loginUsers.fulfilled]: (state, action) => {
			state.token = action.payload.token;
			state.authenticated = true;
		},
		[loginUsers.rejected]: (state, action) => {
			state.serverError = action.payload;
		},
		// [authEmployee.fulfilled]: (state, action) => {
		// 	state.authenticated = true;
		// 	state.id = action.payload.employee._id;
		// 	state.name = action.payload.employee.name;
		// 	state.role = action.payload.employee.role;
		// 	state.sucursalRef = action.payload.employee.sucursal._id;
		// 	state.sucursalId = action.payload.employee.sucursal.id;
		// 	state.sucursalName = action.payload.employee.sucursal.name;
		// },
		// [authEmployee.rejected]: (state, action) => {
		// 	Swal.fire("error", action.payload, "error");
		// },
		// [addEmployee.rejected]: (state, action) => {
		// 	console.log("payload", action.payload);
		// 	Swal.fire("error", action.payload, "error");
		// },
		// [logOut.fulfilled]: (state) => {
		// 	localStorage.removeItem("token");
		// 	state.token = null;
		// 	state.id = false;
		// 	state.authenticated = false;
		// },
	},
});

//export del state
export const selectAuth = (state) => state.auth;

//export de funciones
export const { clearError } = authSlice.actions;

//export del reducer
export default authSlice.reducer;
