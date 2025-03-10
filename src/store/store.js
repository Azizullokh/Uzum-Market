import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import cartReducer from "./CartSlice";

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        cart: cartReducer,
    },
});

export default store;