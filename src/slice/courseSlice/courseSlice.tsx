import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../resetAction";

const initialState: any = {
  currentSublesson: {
    id: "",
    lesson_id: "",
    video_url: "",
    description: "",
    created_at: '',
    updated_at: '',
    deleted: '',
    title: "",
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCurrentSublesson: (state, action) => {
      state.currentSublesson = action.payload;
    },

    resetCourse: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);
  },
});

export const { setCurrentSublesson, resetCourse } = courseSlice.actions;
export default courseSlice.reducer;
