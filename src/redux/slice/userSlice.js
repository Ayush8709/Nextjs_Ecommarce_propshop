import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
    'user/register',
    async ({ name, email, password }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('http://localhost:3000/api/auth/signup', { name, email, password }, config);
            return data;
        } catch (error) {
            return error.response?.data || 'Registration failed';
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post('http://localhost:3000/api/auth/login', { email, password }, config);
            return data;
        } catch (error) {
            return error.response?.data || 'Login failed';
        }
    }
);




const initialState = {
    userInfo: typeof window !== "undefined" ? JSON.parse(localStorage.getItem('userInfo')) || {} : {},
    loading: false,
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.userInfo = {};
            if (typeof window !== "undefined") {
                localStorage.removeItem('userInfo'); // Clear localStorage on logout
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.userInfo = action.payload;
                    state.error = null;
                    if (typeof window !== "undefined") {
                        localStorage.setItem('userInfo', JSON.stringify(action.payload));
                    }
                } else {
                    state.error = action.payload.message || 'Registration failed';
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                if (typeof window !== "undefined") {
                    localStorage.setItem('userInfo', JSON.stringify(action.payload));
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
    }
});

export const { logout: logoutAction } = userSlice.actions;
export default userSlice.reducer;
