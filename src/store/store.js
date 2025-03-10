import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./FavoritesSlice";
import cartReducer from "../store/CartSlice";
s

const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        cart: cartReducer,
    },
});

export default store;