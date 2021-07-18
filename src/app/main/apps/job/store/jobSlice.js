import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
	name: 'job',
	immer: false,
	initialState: {
		jobDetail: null
	},
	reducers: {
		getJob: (state, action) => {
			return {
				...state,
				jobDetail: action.payload
			};
		}
	}
});

export const { getJob } = jobSlice.actions;
export default jobSlice.reducer;
