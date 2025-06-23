import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user';

const initialState = {
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// get user
export const getUser = createAsyncThunk(
    'user',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);

            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('get not working');
        }
    }
)

// create user
export const createUser = createAsyncThunk(
    'new-user',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(API_URL + "/new-user", userData);

            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('create not working')
        }
    }
);

// edit user
export const editUser = createAsyncThunk(
    'user/edit',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.put(API_URL + userData._id, userData);

            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('edit not working');
        }
    }
);

// delete user
export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(API_URL + id);
            getUser()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('delete not working');
        }
    }
);

export const verifyUser = createAsyncThunk(
    'user/verify-user',
    async(userData, thunkAPI) => {
        try {
            const response = await axios.post(API_URL + "/verify-user", userData);
            console.log(response.data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('No User Found')
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.users.findIndex((user) => user._id === action.payload._id)
                state.users.splice(index, 1)
           
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.users.findIndex((user) => user._id === action.payload._id)
                console.log(action.payload)
                state.users.splice(index, 1, action.payload);
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

console.log(userSlice)
export default userSlice.reducer;
export const { reset } = userSlice.actions;