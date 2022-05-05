import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const postFavorite = createAsyncThunk("POST_FAVORITE", async (data) => {
  try {
    const favorite = await axios.post("/api/favoritos", {
      email: data.email,
      movieId: data.id,
      title: data.title,
      imgUrl: data.poster_path,
      description: data.overview,
      userId: data.userId,
    });
    alert("Movie added to favorites");
    return favorite.data;
  } catch (err) {
    console.log(err);
  }
});

export const deleteFavorite = createAsyncThunk(
  "DELETE_FAVORITE",
  async (data) => {
    try {
      const favorite = await axios.delete(
        `/api/favoritos/${data.userId}/${data.movieId}`
      );
      alert("Movie removed from favorites");
      return favorite.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const favoriteReducer = createReducer(
  {},
  {
    [postFavorite.fulfilled]: (state, action) => action.payload,
    [deleteFavorite.fulfilled]: (state, action) => action.payload,
  }
);

export default favoriteReducer;
