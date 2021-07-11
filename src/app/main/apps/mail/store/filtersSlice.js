import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import API from 'api';

export const getFilters = createAsyncThunk(
	'mailApp/filters/getFilters',
	async () => {
		const response = await API.get('/api/mail-app/filters');
		const data = await response.data;

		return data;
	}
);

const filtersAdapter = createEntityAdapter({});

export const { selectAll: selectFilters, selectById: selectFilterById } =
	filtersAdapter.getSelectors(state => state.mailApp.filters);

const filtersSlice = createSlice({
	name: 'mailApp/filters',
	initialState: filtersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getFilters.fulfilled]: filtersAdapter.setAll
	}
});

export default filtersSlice.reducer;
