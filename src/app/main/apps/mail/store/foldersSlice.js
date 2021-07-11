import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import API from 'api';

export const getFolders = createAsyncThunk(
	'mailApp/folders/getFolders',
	async () => {
		const response = await API.get('/api/mail-app/folders');
		const data = await response.data;

		return data;
	}
);

const foldersAdapter = createEntityAdapter({});

export const { selectAll: selectFolders, selectById: selectFolderById } =
	foldersAdapter.getSelectors(state => state.mailApp.folders);

const foldersSlice = createSlice({
	name: 'mailApp/folders',
	initialState: foldersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getFolders.fulfilled]: foldersAdapter.setAll
	}
});

export default foldersSlice.reducer;
