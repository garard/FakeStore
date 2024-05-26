import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "null",
	token: null,
	name: "null",
	loginTime: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.loginTime = Math.floor(Date.now() / 1000);
		},
		logoutUser: () => initialState,
		checkTime: (state) => {
			if (Math.floor(Date.now() / 1000) - state.time > 3600) {
				logoutUser();
				return "expired";
			} else return "OK";
		},
	},
});

export const { loginUser, logoutUser, checkTime } = userSlice.actions;

export default userSlice.reducer;
