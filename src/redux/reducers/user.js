import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            const {Password, ...stateUser} = action.payload;
            return stateUser;
        },
        favoriteAdded: (state, action) => {
            state.FavoriteMovies.push(action.payload);
        },
        favoriteRemoved: (state, action) => {
            const newFavorites = state.FavoriteMovies.filter(movie => movie !== action.payload);
            state.FavoriteMovies = newFavorites;
        }
    }
});

export const { setUser, favoriteAdded, favoriteRemoved } = userSlice.actions;
export default userSlice.reducer;