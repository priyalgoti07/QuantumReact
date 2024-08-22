import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};
export const todoSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        getTodoList: (state) => {
            state.loading = true;
            state.error = null; // Clear any previous errors
        },
        getTodoListSuccess: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
            state.loading = false;
        },
        getTodoListFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})

export const { getTodoList, getTodoListSuccess, getTodoListFailure } = todoSlice.actions
export default todoSlice.reducer