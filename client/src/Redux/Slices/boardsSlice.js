import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardsData: {},
  pending: true,
  backgroundImages: [
    "https://i.pinimg.com/564x/21/bd/b0/21bdb0b387e944c09c3bf01660783604.jpg",
    "https://i.pinimg.com/736x/c1/83/ab/c183ab23a401f76688a09e5befb4eccf.jpg",
    "https://i.pinimg.com/564x/12/a3/5c/12a35c01e0b376e1eb735c433edce51f.jpg",
    "https://i.pinimg.com/564x/12/a3/5c/12a35c01e0b376e1eb735c433edce51f.jpg",
    "https://i.pinimg.com/564x/77/c1/6c/77c16c0316c2989336844885843f12e9.jpg",
    "https://i.pinimg.com/564x/c8/be/35/c8be359d6dcaf5b2a9d5093104b0d046.jpg",
    "https://i.pinimg.com/564x/98/52/f4/9852f4bb022047dc29adada9652b898b.jpg",
    "https://i.pinimg.com/564x/62/70/4d/62704d757cf895caf2d7c11be121734e.jpg",
    "https://i.pinimg.com/564x/8c/52/7e/8c527ea1c0c1132f54e1ce523f6c4ed6.jpg",
  ],
  smallPostfix:
    "?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM2NjUzNDgz&ixlib=rb-1.2.1&q=80&w=400",
  creating: false,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    startFetchingBoards: (state) => {
      state.pending = true;
    },
    successFetchingBoards: (state, action) => {
      state.boardsData = action.payload.boards;
      state.pending = false;
    },
    failFetchingBoards: (state) => {
      state.pending = false;
    },
    startCreatingBoard: (state) => {
      state.creating = true;
    },
    successCreatingBoard: (state, action) => {
      state.boardsData.push(action.payload);
      state.creating = false;
    },
    failCreatingBoard: (state) => {
      state.creating = true;
    },
    reset:(state)=>{
      state=initialState;
    }
  },
});

export const {
  startFetchingBoards,
  successFetchingBoards,
  failFetchingBoards,
  startCreatingBoard,
  successCreatingBoard,
  failCreatingBoard,
  reset
} = boardsSlice.actions;
export default boardsSlice.reducer;
