import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userData/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer  // Use the custom key name here
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;