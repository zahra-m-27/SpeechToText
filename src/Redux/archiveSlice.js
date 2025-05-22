import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listAllTranscripts } from "../API/roshan";

export const fetchArchiveFromAPI = createAsyncThunk(
  "archive/fetchArchive",
  async (_, thunkAPI) => {
    try {
      const response = await listAllTranscripts();
      return response.results; // use only "results" field
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    data: [], // current visible list (e.g., page 1)
    allData: [], //store everything here for offline pagination
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
      state.allData.unshift(action.payload); // Add to beginning
      state.totalPages = Math.ceil(state.allData.length / state.pageSize);
      state.data = state.allData.slice(0, state.pageSize); // Recalculate visible data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchiveFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArchiveFromAPI.fulfilled, (state, action) => {
        const data = action.payload.map((item) => ({
          name: item.filename,
          date: new Date(item.processed).toLocaleDateString("fa-IR"),
          type: item.filename?.split(".").pop() || "",
          duration: item.duration.replace("0:", ""), // crude fix for display
          uploadType: item.url.includes("recording")
            ? "voice"
            : item.url.includes("files")
            ? "upload"
            : "link",
          ...item,
        }));

        state.allData = data;
        state.totalPages = Math.ceil(data.length / state.pageSize);
        state.data = data.slice(0, state.pageSize);
        state.currentPage = 1;
        state.loading = false;
      })
      .addCase(fetchArchiveFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
