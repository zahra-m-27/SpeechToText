// archiveSlice.js
import { createSlice } from "@reduxjs/toolkit";

const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    data: [], // current visible list (e.g., page 1)
    allData: [], // optional: store everything here for offline pagination
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setArchiveData: (state, action) => {
      state.allData = action.payload;
      state.totalPages = Math.ceil(action.payload.length / state.pageSize);
      state.data = action.payload.slice(0, state.pageSize);
      state.currentPage = 1;
    },
    goToPage: (state, action) => {
      const page = action.payload;
      const start = (page - 1) * state.pageSize;
      const end = page * state.pageSize;
      state.data = state.allData.slice(start, end);
      state.currentPage = page;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.totalPages = Math.ceil(state.allData.length / action.payload);
      state.data = state.allData.slice(0, action.payload);
      state.currentPage = 1;
    },
    clearArchive: (state) => {
      state.data = [];
      state.allData = [];
      state.currentPage = 1;
      state.totalPages = 0;
    },
    addToArchive: (state, action) => {
      state.allData.push(action.payload);
    },
  },
});

export const {
  setArchiveData,
  goToPage,
  setPageSize,
  clearArchive,
  addToArchive,
} = archiveSlice.actions;

export default archiveSlice.reducer;
