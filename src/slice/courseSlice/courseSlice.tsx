import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../resetAction";

const initialState: any = {
  currentSublesson: {
    id: "",
    lesson_id: "",
    video_url: "",
    description: "",
    created_at: "",
    updated_at: "",
    deleted: "",
    title: "",
  },
  test: {
    currentTest: null,
    remainingSeconds: 0,
    isRunning: false,
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCurrentSublesson: (state, action) => {
      state.currentSublesson = action.payload;
    },

    resetCourse(state) {
      state.currentSublesson = initialState.currentSublesson;
    },

    setTest(state, action) {
      state.test.currentTest = action.payload;
    },

    startTimer(state, action) {
      state.test.isRunning = true;
      state.test.remainingSeconds = action.payload;
    },

    decrementTimer(state) {
      if (state.test.remainingSeconds > 0) {
        state.test.remainingSeconds -= 1;
      }
    },

    resetTimer(state) {
      state.test = initialState.test;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);
  },
});

export const {
  setCurrentSublesson,
  setTest,
  startTimer,
  decrementTimer,
  resetTimer,
  resetCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
