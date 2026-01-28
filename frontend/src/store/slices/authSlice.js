import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../../firebase';
import axios from 'axios';

// ... (imports)

const BACKEND_URL = 'http://localhost:5000/api/users';

// Helper to format user data
const formatUser = (user, role = 'patient') => ({
    uid: user._id, // MongoDB ID
    email: user.email,
    name: user.name,
    role: user.role,
    photoURL: user.image,
});

const initialState = {
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null, // Note: user.image might be undefined if not in DB, but won't crash
    isLoading: false,
    error: null,
    message: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${BACKEND_URL}/login`, { email, password }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password, phone, role }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${BACKEND_URL}`, { name, email, password, phone, role }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (_, { rejectWithValue }) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // Send to backend
            const { data } = await axios.post(`${BACKEND_URL}/social-login`, {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                provider: 'google'
            }, config);

            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const facebookLogin = createAsyncThunk(
    'auth/facebookLogin',
    async (_, { rejectWithValue }) => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // Send to backend
            const { data } = await axios.post(`${BACKEND_URL}/social-login`, {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                provider: 'facebook'
            }, config);

            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await signOut(auth); // Optional: Sign out from Firebase if we want
    localStorage.removeItem('userInfo');
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        // Shared pending/rejected handlers could be simplified, but explicit here for clarity
        builder
            .addCase(login.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(login.fulfilled, (state, action) => { state.isLoading = false; state.userInfo = action.payload; })
            .addCase(login.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

            .addCase(register.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
                state.message = action.payload.message; // "Verification email sent!"
            })
            .addCase(register.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

            .addCase(googleLogin.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(googleLogin.fulfilled, (state, action) => { state.isLoading = false; state.userInfo = action.payload; })
            .addCase(googleLogin.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

            .addCase(facebookLogin.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(facebookLogin.fulfilled, (state, action) => { state.isLoading = false; state.userInfo = action.payload; })
            .addCase(facebookLogin.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

            .addCase(logout.fulfilled, (state) => { state.userInfo = null; });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
