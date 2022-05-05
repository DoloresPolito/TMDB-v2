import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import favoriteReducer from "./favorites";
import movieReducer from "./searchMovie"
import peopleReducer from "./searchPeople";
import favoritesReducer from "./userFavorites";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      movie: movieReducer,
      people: peopleReducer,
      favorite: favoriteReducer,
      favorites: favoritesReducer,
  
    },
  });
  
  export default store;