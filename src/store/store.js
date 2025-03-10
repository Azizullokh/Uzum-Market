import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice.js";
import cartReducer from "./CartSlice";

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        cart: cartReducer,
    },
});

export default store;