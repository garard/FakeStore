import React from "react";
import { useSelector } from "react-redux";

const CartBadge = () => {
	const cart = useSelector((state) => state.cart);
	const totalQuantity = Object.values(cart).reduce(
		(acc, count) => acc + count,
		0
	);
	// console.log(totalQuantity > 0 ? totalQuantity : null);
	console.log(totalQuantity);
};

export default CartBadge;
