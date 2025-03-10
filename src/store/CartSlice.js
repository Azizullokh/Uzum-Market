import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loadCartFromStorage = () => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
};

const initialState = {
    cart: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (!state.cart.some(item => item.id === action.payload.id)) {
                state.cart.push(action.payload);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                toast.success("Product added to cart!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
            toast.error("Product removed from cart!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;