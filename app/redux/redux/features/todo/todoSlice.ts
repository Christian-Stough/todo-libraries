import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  list: Todo[];
}

const initialState: TodoState = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.list.push({
        id: state.list.length + 1,
        title: action.payload,
        completed: false,
      });
    },
    toggle: (state, action: PayloadAction<number>) => {
      state.list.map((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, toggle, remove } = todoSlice.actions;

export default todoSlice.reducer;
