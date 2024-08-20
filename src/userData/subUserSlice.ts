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
        updateSubUser: (state, action: PayloadAction<InputFiled>) => {
            let index = state.subusers.findIndex((record) => record.id === action.payload.id)
            if (index !== -1) {
                // If the subuser exists, update it with the new data
                state.subusers[index] = action.payload;
            } else {
                console.log("User not found with ID:", action.payload.id);
            }
            console.log("Updated state:", current(state));


        },
        deleteSubuser: (state, action: PayloadAction<string>) => {
            state.subusers = state.subusers.filter((record) => record.id !== action.payload)
        }
    }
})

export const { addSubUser, updateSubUser, deleteSubuser } = userSlice.actions
export default userSlice.reducer