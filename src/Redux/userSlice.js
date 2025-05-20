import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  userInfo: {
    name: "مهمان",
    password: 1234,
  },
  //archive: [], // entire archive for that user
  archive: [
    {
      name: "khaterate To",
      date: "1400/08/20",
      type: ".mp4",
      duration: "4:38",
      uploadType: "link",
    },
    {
      name: "https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin ...",
      date: "1400/08/20",
      type: ".wav",
      duration: "2:14",
      uploadType: "voice",
    },
    {
      name: "پادکست رادیو راه - فصل دوم - قسمت ششم - راه سروش",
      date: "1400/08/19",
      type: ".mp3",
      duration: "1:28:18",
      uploadType: "upload",
    },
    {
      name: "Random song",
      date: "1400/08/19",
      type: ".mp3",
      duration: "1:28:18",
      uploadType: "link",
    },
    {
      name: "https://irsv.upmusics.com/Downloads/Musics/Sirvan%20K ...",
      date: "1400/08/20",
      type: ".mp3",
      duration: "4:39",
      uploadType: "upload",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      state.archive = action.payload.archive || []; // preload archive if available
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.archive = [];
    },
    updateUserArchive: (state, action) => {
      state.archive = action.payload;
    },
  },
});

export const { logIn, logOut, updateUserArchive } = userSlice.actions;
export default userSlice.reducer;
