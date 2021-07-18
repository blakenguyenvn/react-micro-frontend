import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
	name: 'apps/job',
	immer: false,
	initialState: {
		jobDetail: null
	},
	reducers: {
		getJob() {},
		setJob: (state, action) => {
			console.log(action);
			return {
				...state,
				jobDetail: action.payload
			};
		}
	}
});

export const { getJob, setJob } = jobSlice.actions;
export default jobSlice.reducer;
