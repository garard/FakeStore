import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
	name: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			console.log("Adding user email");
			console.log(action.payload.name);
			console.log("Adding user email");
			console.log(action.payload.email);
			console.log("Adding user token");
			console.log(action.payload.token);
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.token = action.payload.token;
		},
		logoutUser: () => initialState,
		// 	console.log("logging out user");
		// 	state.email = null;
		// 	state.token = null;
		// },
		checkAccount: (state) => {
			console.log("Current User: ");
			console.log("email: ", state.email);
			console.log("token: ", state.token);
		},
	},
});

export const { loginUser, logoutUser, checkAccount } = userSlice.actions;

export default userSlice.reducer;
