import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "../userData/userSlice";
import subuserReducer, { SubUserState } from "../userData/subUserSlice"; // Import subuser slice
import createSagaMiddleware from "redux-saga"

import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, PersistConfig, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import todoSlice from "../userData/todoSlice";
import todoSaga from "../userData/todoSaga";


// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
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
        todoSlice // non-persisted reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for redux-persist
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(todoSaga);
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;