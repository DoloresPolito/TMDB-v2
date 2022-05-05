import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getPeople = createAsyncThunk("GET_PEOPLE", async (person) => {
  try {
    const people = await axios.get(`/api/people/${person}`);
    return people.data;
  } catch (err) {
    console.log(err);
  }
});

const peopleReducer = createReducer({}, {
  [getPeople.fulfilled]: (state, action) => action.payload,
});

export default peopleReducer;
