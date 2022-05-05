import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getFavorites = createAsyncThunk("GET_FAVORITES", async (id) => {
  try {
    const favorites = await axios.get(`/api/favoritos/${id}`);
    return favorites.data;
  } catch (err) {
    console.log(err);
  }
});



const favoritesReducer = createReducer([], {
  [getFavorites.fulfilled]: (state, action) => action.payload,
});

export default favoritesReducer;




