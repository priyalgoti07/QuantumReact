import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    newpassword?: string
}
// Define a type for the slice state
export interface UserState {
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
        setUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
            const newUser = {
                ...action.payload,
                id: nanoid()
            }
            state.users.push(newUser)
            // localStorage.setItem("users", JSON.stringify(state.users))
        },
        updatePassword: (state, action: PayloadAction<User>) => {
            const user = state.users.find(user => user.email === action.payload.email);
            if (user) {
                user.password = action.payload.newpassword
            }
        }
    }
})

export const { setUser, updatePassword } = userSlice.actions
export default userSlice.reducer