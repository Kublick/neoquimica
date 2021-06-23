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
		} else {
			dispatch(logOut);
			return;
		}

		try {
			const res = await axiosClient.get("/api/auth/");
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
		sucursal: "",
	},
	reducers: {
		clearError: (state) => {
			state.serverError = null;
		},
		logOut: (state) => {
			localStorage.removeItem("token");
			state.token = null;
			state.authenticated = false;
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
		[authEmployee.fulfilled]: (state, action) => {
			state.authenticated = true;
			state.name = action.payload.name;
			state.role = action.payload.role;
			state.sucursal = action.payload.sucursal;
		},
		[authEmployee.rejected]: (state, action) => {
			state.serverError = action.payload;
		},
	},
});

//export del state
export const selectAuth = (state) => state.auth;

//export de funciones
export const { clearError, logOut } = authSlice.actions;

//export del reducer
export default authSlice.reducer;
