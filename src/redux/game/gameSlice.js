import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/games';

const initialState = {
    games: [],
    isError: false,
    isSuccess: false,
    isLoading: false
}

// This file contains the Redux slice for managing game-related state in a gaming application.
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


// edit game
export const editGame = createAsyncThunk(
    'game/edit',
    async (sentToRedux, thunkAPI) => {
        try {
            await thunkAPI.dispatch(getGames())
            return  { id: sentToRedux.id, newTitle: sentToRedux.title }; // 👈 this is key
        } catch (error) {
            return thunkAPI.rejectWithValue('edit not working');
        }
    }
);

// delete game
export const deleteGame = createAsyncThunk(
    'game/delete',
    async (sentToRedux, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/${sentToRedux}`);
            await thunkAPI.dispatch(getGames());
            return response.data; // This should return the deleted game data
        // If you want to return the deleted game ID, you can do so like this:
        // return { id: sentToRedux };  
        } catch (error) {
            return thunkAPI.rejectWithValue('delete not working');
        }
    }
);

// add comment
/**
 * Async thunk to add a comment to a game.
 *
 * Dispatches a PUT request to the API to add a comment for the specified game ID,
 * then refreshes the games list by dispatching getGames().
 *
 * @function
 * @param {Object} sentToRedux - The payload containing the game ID and comment.
 * @param {string|number} sentToRedux.id - The ID of the game to add the comment to.
 * @param {string} sentToRedux.comment - The comment to be added.
 * @param {Object} thunkAPI - The thunk API object provided by Redux Toolkit.
 * @returns {Promise<Object>} The response data from the API if successful.
 * @throws {string} Returns a rejection value if the request fails.
 */
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
/*
const gameSlice = createSlice({
    name: 'game',
    reducers: {
        reset: (state) => {
            state.games = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
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
                state.message = action.payload;
            })
            .addCase(getGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.games = action.payload;
            })
            .addCase(getGames.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
           .addCase(deleteGame.pending, (state) => {
                state.isLoading = true; 
            })
            .addCase(deleteGame.fulfilled, (state, action) => { 
                state.isLoading = false;
                state.isSuccess = true; 
                const index = state.games.findIndex((game) => game._id === action.payload._id);
                state.games.splice(index, 1);
            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editGame.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editGame.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editGame.fulfilled, (state, action) => {
                state.isLoading = false;
                const { id, newTitle } = action.payload;
                state.isSuccess = true;
                state.message = 'Game updated successfully';
                // Find the game by id and update its title
                // This is where we update the title of the game in the state
                const index = state.games.findIndex((game) => game._id === id);
                if (index !== -1) {
                    state.games[index].title = newTitle;
                }
            })
            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.games.findIndex((game) => game._id === action.payload._id);
                state.games[index].comment.push(action.payload.comment);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
}); 
*/

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(getGames.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        
      });
  }
});

// console.log(gameSlice)
export const { actions: gameActions } = gameSlice;

export default gameSlice.reducer;
export const { reset } = gameSlice.actions;