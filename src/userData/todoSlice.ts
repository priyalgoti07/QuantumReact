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
    page: number;
    hasMore: boolean; // Add this state to track if more items are available
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
    page: 1,//start with page 1
    hasMore: true, // Initialize as true
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
            if (action.payload.length === 0) {
                state.hasMore = false; // No more data
            } else {
                state.todos = [...state.todos, ...action.payload];
                state.page += 1; // Increment page for the next request
            }
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