import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { data: [] } as { data: File[] };
export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage(state, action) {
      return { ...state, data: action.payload };
    },

    resetImage(state) {
      return { ...state, data: [] };
    },
  },
});

export const { setImage, resetImage } = imageSlice.actions;

export default imageSlice.reducer;

export const selectImage = (store: RootState) => store.image.data;
