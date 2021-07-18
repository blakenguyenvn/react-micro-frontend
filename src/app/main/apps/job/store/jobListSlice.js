import { createSlice } from '@reduxjs/toolkit';

const jobListSlice = createSlice({
	name: 'apps/jobList',
	immer: false,
	initialState: {
		jobs: null
	},
	reducers: {
		getJobs() {},
		setJobs: (state, action) => {
			return {
				...state,
				jobs: action.payload
			};
		}
	}
});

export const { getJobs, setJobs } = jobListSlice.actions;
export default jobListSlice.reducer;
