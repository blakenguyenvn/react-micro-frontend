import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api';

export const getUserData = createAsyncThunk(
	'chatApp/user/getUserData',
	async () => {
		const response = await API.get('/api/chat/user');
		const data = await response.data;
		return data;
	}
);

export const updateUserData = createAsyncThunk(
	'chatApp/user/updateUserData',
	async newData => {
		const response = await API.post('/api/chat/user/data', newData);
		const data = await response.data;

		return data;
	}
);

const userSlice = createSlice({
	name: 'chatApp/user',
	initialState: null,
	reducers: {
		updateUserChatList: (state, action) => {
			state.chatList = action.payload;
		}
	},
	extraReducers: {
		[getUserData.fulfilled]: (state, action) => action.payload,
		[updateUserData.fulfilled]: (state, action) => action.payload
	}
});

export const { updateUserChatList } = userSlice.actions;

export default userSlice.reducer;