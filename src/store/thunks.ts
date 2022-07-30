import { createAsyncThunk } from "@reduxjs/toolkit";
import storage from "../data/storage";

export const loadDataFromStorage = createAsyncThunk("loadData", () =>
  storage.get()
);
