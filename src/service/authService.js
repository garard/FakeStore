import { server, port } from "./serverSetting";

export const signupUser = async ({ name, email, password }) => {
	const url = `${server}:${port}/users/signup`;
	const user = { name, email, password };
	// console.log(user);
	try {
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		// console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to sign up user: " + error);
	}
};

// data object contains token, use data.token
export const signinUser = async ({ email, password }) => {
	const url = `${server}:${port}/users/signin`;
	const user = { email, password };
	console.log(user);
	try {
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		throw new Error("Failed to sign in: " + error);
	}
};

export const updateUserProfile = async ({ token, name, password }) => {
	const url = `${server}:${port}/users/update`;
	const user = { name, password };
	console.log(name);
	try {
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(user),
		});
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		throw new Error("Failed to update: " + error);
	}
};

export const createNewOrder = async ({ token, order }) => {
	const url = `${server}:${port}/orders/neworder`;
	console.log("order token");
	console.log(order);
	console.log(token);
	console.log("order token");
	try {
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(order),
		});
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		throw new Error("Failed to create order: " + error);
	}
};

export const retrieveOrders = async ({ token }) => {
	const url = `${server}:${port}/orders/all`;
	console.log("getting orders");
	//console.log(token);
	try {
		const res = await fetch(url, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await res.json();
		console.log("returned orders");
		return data;
	} catch (error) {
		throw new Error("Failed to create order: " + error);
	}
};

export const updateOrders = async ({ orderID, is_paid, token }) => {
	const url = `${server}:${port}/orders/updateorder`;

	const update = {
		orderID,
		isPaid: is_paid === 0 ? 1 : 1,
		isDelivered: is_paid === 1 ? 1 : 0,
	};
	console.log(update);
	try {
		const res = await fetch(url, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(update),
		});
		const data = await res.json();
		console.log("returned info");
		return data;
	} catch (error) {
		throw new Error("Failed to create order: " + error);
	}
};
