import { createSlice } from '@reduxjs/toolkit';

const jobListSlice = createSlice({
	name: 'jobList',
	immer: false,
	initialState: {
		jobs: null
	},
	reducers: {
		getJobs: (state, action) => {
			return {
				...state,
				jobs: action.payload
			};
		}
	}
});

export const { getJobs } = jobListSlice.actions;
export default jobListSlice.reducer;
