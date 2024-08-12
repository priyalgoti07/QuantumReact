import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "../userData/userSlice";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

// Define the persist configuration type
type PersistedReducerType = PersistConfig<UserState>



// Define the persist configuration object
const persistConfig: PersistedReducerType = {
    key: 'root',
    storage,
}


// Explicitly type the persisted reducer
const persistedReducer = persistReducer<UserState>(persistConfig, userReducer)



export const store = configureStore({
    reducer: {
        // user: userReducer  // Use the custom key name here   
        user: persistedReducer //// Use the persisted reducer
    }
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;