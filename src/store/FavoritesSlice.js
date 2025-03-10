import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
};

const initialState = {
    favorites: loadFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const itemExists = state.favorites.find((item) => item.id === action.payload.id);
            if (!itemExists) {
                state.favorites.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter((item) => item.id !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;