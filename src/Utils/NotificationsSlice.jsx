import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notificationsPopup",
  initialState: { notify: {} },
  reducers: {
    setNotifcationsPopup: (state, { payload: payload }) => {
      state.notify = payload;
    },
  },
});

export const { setNotifcationsPopup } = slice.actions;

export default slice.reducer;