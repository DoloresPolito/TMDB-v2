import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const postEvent = createAsyncThunk("POST_EVENT", async () => {
  try {
    const event = await axios.post("/api/favoritos", {
    });
    return event.data;
  } catch (err) {
    console.log(err);
  }
});

const eventReducer = createReducer(
    "",
    {
      [postEvent.fulfilled]: (state, action) => action.payload,
     
    }
  );
  
  export default eventReducer;