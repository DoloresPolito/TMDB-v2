import axios from "axios"; 
import { createReducer , createAsyncThunk} from "@reduxjs/toolkit";


export const getMovie = createAsyncThunk("GET_MOVIE", async (urlKeyWordEnv) => {
  try {
    const movie = await axios.get(urlKeyWordEnv);
    return movie.data;
  } catch (err) {
    console.log(err);
  }
});


const movieReducer = createReducer([], {
  [getMovie.fulfilled]: (state,action) => action.payload,

})
 
export default movieReducer;