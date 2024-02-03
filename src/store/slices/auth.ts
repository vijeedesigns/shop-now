import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHandler } from "../fetchHandler";

type UserDetails = {
    guid: string,
    name: string,
    username: string,
    type: number
}

const initialUserDetails: UserDetails = {
    guid: "",
    name: "",
    username: "",
    type: 0
}

export const login = createAsyncThunk("login", async (body: object) => {
    return await fetchHandler({
        url: "auth/login",
        method: "POST",
        secure: false,
        body
    });
});

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userDetails: initialUserDetails,
        jwt: null,
        error: null
    },
    reducers: {
        logOut: (state) => {
            state.userDetails = initialUserDetails;
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.userDetails = initialUserDetails;
            state.jwt = null;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            const data = action?.payload?.data;
            if(data?.status === 200) {
                state.userDetails = data?.data;
                state.jwt = data?.jwt;
                state.error = null;
            } else {
                state.userDetails = initialUserDetails;
                state.jwt = null;
                state.error = data;
            }
        })
    },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
