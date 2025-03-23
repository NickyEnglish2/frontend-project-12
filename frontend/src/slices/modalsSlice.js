/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalProps: {},
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, action) => {
      const { modalType, modalProps } = action.payload;
      state.modalType = modalType;
      state.modalProps = modalProps;
    },
    hideModal: (state) => {
      state.modalType = null;
      state.modalProps = {};
    },
  },
});

export const { showModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
