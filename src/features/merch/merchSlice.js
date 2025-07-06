import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/merch';

const initialState = {
    merch: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// get merch
export const getMerch = createAsyncThunk(
    'merch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);

            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('get not working');
        }
    }
)

// create merch
export const createMerch = createAsyncThunk('merch/create', async (merchData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}`, merchData, {
            headers: {
                'Content-Type': 'multipart/merch-data',
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

// edit merch
export const editMerch = createAsyncThunk(
    'merch/edit',
    async (sentToRedux, thunkAPI) => {
        try {
            console.log(sentToRedux)
            const response = await axios.put(`${API_URL}/edit-merch/${sentToRedux.id}`, { name: sentToRedux.name });
            await thunkAPI.dispatch(getMerch())
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('edit not working');
        }
    }
);


// delete merch
export const deleteMerch = createAsyncThunk(
    'merch/delete',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(API_URL + id);
            getMerch()
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('delete not working');
        }
    }
);

const merchSlice = createSlice({
    name: 'merch',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMerch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMerch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.merch.push(action.payload);
            })
            .addCase(createMerch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getMerch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMerch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.merch = action.payload;
            })
            .addCase(getMerch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deleteMerch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMerch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.merch.findIndex((merch) => merch._id === action.payload._id)
                state.merch.splice(index, 1)

            })
            .addCase(deleteMerch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editMerch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editMerch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.merch.findIndex((merch) => merch._id === action.payload._id)
                console.log(action.payload)
                state.merch.splice(index, 1, action.payload);
            })
            .addCase(editMerch.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

console.log(merchSlice)
export default merchSlice.reducer;
export const { reset } = merchSlice.actions;