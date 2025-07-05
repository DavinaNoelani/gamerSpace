import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/games';

const initialState = {
    games: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// get games
export const getGames = createAsyncThunk(
    'games',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);

            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('get not working');
        }
    }
)

// create game
// This function is used to create a new game by sending a POST request to the server with the game data.
// It uses FormData to handle file uploads, allowing the user to upload images along with other game details.
// The function is an asynchronous thunk action that can be dispatched in a Redux application.
export const createGame = createAsyncThunk('game/create', async (formData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

// await axios.put(`${API_URL}/edit-game/${sentToRedux.id}`, {...})
// edit game
export const editGame = createAsyncThunk(
    'games/edit',
    async (sentToRedux, thunkAPI) => {
        try {
            console.log(sentToRedux)
            const response = await axios.put(`${API_URL}/edit-game/${sentToRedux.id}`,
                { title: sentToRedux.title });
            await thunkAPI.dispatch(getGames())
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('edit not working');
        }
    }
);


// delete game
export const deleteGame = createAsyncThunk(
    'games/delete',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            await thunkAPI.dispatch(getGames());
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('delete not working');
        }
    }
);

// add comment
export const addComment = createAsyncThunk(
    'games/add-comment',
    async (sentToRedux, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/add-comment/${sentToRedux.id}`, { comment: sentToRedux.comment });
            await thunkAPI.dispatch(getGames());
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('add comment not working')
        }
    }
)

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGame.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.games.push(action.payload);
            })
            .addCase(createGame.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.games = action.payload;
            })
            .addCase(getGames.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deleteGame.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.games.findIndex((game) => game._id === action.payload._id)
                state.games.splice(index, 1)

            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editGame.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editGame.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.games.findIndex((game) => game._id === action.payload._id)
                // console.log(action.payload)
                console.log('splice', state.games.splice(index, 1, action.payload))
                state.games.splice(index, 1, action.payload);
            })
            .addCase(editGame.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.games.findIndex((game) => game._id === action.payload._id)
                // state.games.comment.push(action.payload)
                state.games.splice(index, 1, action.payload)
                // console.log(state.games.comment, 'state.comment')
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
    },
});

console.log(gameSlice)
export default gameSlice.reducer;
export const { reset } = gameSlice.actions;