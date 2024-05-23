import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "null",
	token: null,
	name: "null",
	time: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			console.log("Adding user name");
			console.log(action.payload.name);
			console.log("Adding user email");
			console.log(action.payload.email);
			console.log("Adding user token");
			console.log(action.payload.token);
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.time = Math.floor(Date.now() / 1000);
			console.log(state.time);
		},
		logoutUser: () => initialState,
		checkTime: (state) => {
			if (Math.floor(Date.now() / 1000) - state.time > 3600) {
				logoutUser();
				return "expired";
			} else return "OK";
		},
		checkAccount: (state) => {
			console.log("Current User: ");
			console.log("email: ", state.email);
			console.log("token: ", state.token);
		},
	},
});

export const { loginUser, logoutUser, checkAccount, checkTime } =
	userSlice.actions;

export default userSlice.reducer;
