import { server, port } from "./serverSetting";

export const signupUser = async ({ name, email, password }) => {
	const url = `${server}:${port}/users/signup`;
	const user = { name, email, password };
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

		return data;
	} catch (error) {
		throw new Error("Failed to sign up user: " + error);
	}
};

export const signinUser = async ({ email, password }) => {
	const url = `${server}:${port}/users/signin`;
	const user = { email, password };

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

		return data;
	} catch (error) {
		throw new Error("Failed to sign in: " + error);
	}
};

export const updateUserProfile = async ({ token, name, password }) => {
	const url = `${server}:${port}/users/update`;
	const user = { name, password };
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
		return data;
	} catch (error) {
		throw new Error("Failed to update: " + error);
	}
};

export const createNewOrder = async ({ token, order }) => {
	const url = `${server}:${port}/orders/neworder`;
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
		return data;
	} catch (error) {
		throw new Error("Failed to create order: " + error);
	}
};

export const retrieveOrders = async ({ token }) => {
	const url = `${server}:${port}/orders/all`;
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

		return data;
	} catch (error) {
		throw new Error("Failed to create order: " + error);
	}
};

export const syncCart = async ({ cart, token }) => {
	const url = `${server}:${port}/cart`;
	try {
		const res = await fetch(url, {
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(cart),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error("Failed to create order: " + error);
	}
};

export const retrieveCart = async ({ token }) => {
	const url = `${server}:${port}/cart`;
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
		return data;
	} catch (error) {
		throw new Error("Failed to create order: " + error);
	}
};
