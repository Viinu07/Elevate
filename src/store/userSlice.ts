import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
}

interface UserState {
    data: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: {
        id: 'u-1',
        name: 'Viinu',
        email: 'viinu@elevate.com',
        role: 'Admin',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viinu'
    },
    isAuthenticated: true,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            if (state.data) {
                state.data = { ...state.data, ...action.payload };
            }
        }
    }
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
