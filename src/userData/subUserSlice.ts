import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { InputFiled } from "../components/user/Create";

interface UserCreate {
    id: string;
    fullName: string;
    emailAdress: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    company: string;
}
export interface SubUserState {
    subusers: UserCreate[];  // Change to an object if you're managing a single user, or use an array for multiple users
}

// Define the initial state
const initialState: SubUserState = {
    subusers: []  // Start with no user logged in
}
export const userSlice = createSlice({
    name: "subusers",
    initialState,
    reducers: {
        addSubUser: (state, action: PayloadAction<Omit<InputFiled, 'id'>>) => {
            const newSubUser = {
                ...action.payload,
                id: nanoid()
            }
            state.subusers.push(newSubUser)
            // localStorage.setItem("users", JSON.stringify(state.users))
        },
        // updatePassword: (state, action: PayloadAction<User>) => {
        //     const user = state.subusers.find(user => user.email === action.payload.email);
        //     if (user) {
        //         user.password = action.payload.newpassword
        //     }
        // }
    }
})

export const { addSubUser, } = userSlice.actions
export default userSlice.reducer