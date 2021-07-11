import {
	createEntityAdapter,
	createSlice,
	createAsyncThunk
} from '@reduxjs/toolkit';
import API from 'api';

export const getProjects = createAsyncThunk(
	'projectDashboardApp/projects/getProjects',
	async () => {
		const response = await API.get('/api/project-dashboard-app/projects');
		return response.data;
	}
);

const projectsAdapter = createEntityAdapter({});

export const {
	selectAll: selectProjects,
	selectEntities: selectProjectsEntities,
	selectById: selectProjectById
} = projectsAdapter.getSelectors(state => state.projectDashboardApp.projects);

const projectsSlice = createSlice({
	name: 'projectDashboardApp/projects',
	initialState: projectsAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getProjects.fulfilled]: projectsAdapter.setAll
	}
});

export default projectsSlice.reducer;
