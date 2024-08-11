import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
// Define a type for the slice state
interface UserState {
    users: User[];  // Change to an object if you're managing a single user, or use an array for multiple users
}

// Define the initial state
const initialState: UserState = {
    users: []  // Start with no user logged in
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer