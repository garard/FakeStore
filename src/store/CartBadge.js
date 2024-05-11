import React from "react";
import { useSelector } from "react-redux";

const CartBadge = () => {
    const cart = useSelector((state) => state.cart);

    const totalQuantity = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

    return totalQuantity;
};

export default CartBadge;