import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "../userData/userSlice";
import subuserReducer, { SubUserState } from "../userData/subUserSlice"; // Import subuser slice

import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

// Define the persist configuration types
type UserPersistedReducerType = PersistConfig<UserState>;
type SubUserPersistedReducerType = PersistConfig<SubUserState>;



// Define the persist configuration object
const persistConfig: UserPersistedReducerType = {
    key: 'root',
    storage,
}

const subuserPersistConfig: SubUserPersistedReducerType = {
    key: 'subuser',
    storage,
};

// Explicitly type the persisted reducer
const persistedReducer = persistReducer<UserState>(persistConfig, userReducer)
const persistedSubuserReducer = persistReducer<SubUserState>(subuserPersistConfig, subuserReducer);

export const store = configureStore({
    reducer: {
        // user: userReducer  // Use the custom key name here   
        user: persistedReducer,  // Use the persisted reducer
        subuser: persistedSubuserReducer, // Use the persisted subuser reducer
    }
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;