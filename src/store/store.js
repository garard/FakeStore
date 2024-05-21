import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import userReducer from "./userSlice";

export default configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
	},
});
