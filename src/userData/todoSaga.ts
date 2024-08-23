// src/userData/todoSaga.ts
import { ForkEffect, call, put, select, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { getTodoList, getTodoListSuccess, getTodoListFailure } from './todoSlice';
import { RootState } from '../app/store';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

type TodoResponse = AxiosResponse<Todo[]>;

// Define the saga worker
function* fetchTodoList(): Generator<any, void, TodoResponse> {
    try {
        const page = yield select((state: RootState) => state.todoSlice.page); // Get current page from state


        // Call the API with pagination
        const response: TodoResponse = yield call(
            axios.get,
            `https://jsonplaceholder.typicode.com/todos?_limit=15&_page=${page}`
        );

        yield put(getTodoListSuccess(response.data)); // Dispatch success action
    } catch (error) {
        yield put(getTodoListFailure((error as Error).message)); // Dispatch failure action
    }
}

// Define the watcher saga
function* todoSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(getTodoList.type, fetchTodoList);
}

export default todoSaga;
