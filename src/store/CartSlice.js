import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error("JSON Parsing Error:", error);
        localStorage.removeItem("cart");
        return [];
    }
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
                state.cart.push({...action.payload, quantity: action.payload.quantity || 1 });
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
        updateQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item) {
                const newQuantity = Number(action.payload.quantity);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                    item.quantity = newQuantity;
                    localStorage.setItem("cart", JSON.stringify(state.cart));
                    toast.success("The product has been edited!", {
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
            }
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;