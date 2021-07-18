import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter
} from '@reduxjs/toolkit';
import API from 'api';

export const getWidgets = createAsyncThunk(
	'analyticsDashboardApp/widgets/getWidgets',
	async () => {
		const response = await API.get('/api/analytics-dashboard-app/widgets');
		const data = await response.data;

		return data;
	}
);

const widgetsAdapter = createEntityAdapter({});

export const {
	selectEntities: selectWidgetsEntities,
	selectById: selectWidgetById
} = widgetsAdapter.getSelectors(state => state.analyticsDashboardApp.widgets);

const widgetsSlice = createSlice({
	name: 'analyticsDashboardApp/widgets',
	initialState: widgetsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getWidgets.fulfilled]: widgetsAdapter.setAll
	}
});

export default widgetsSlice.reducer;
