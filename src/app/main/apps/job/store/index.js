import { combineReducers } from '@reduxjs/toolkit';
import jobSlice from './jobSlice';
import jobListSlice from './jobListSlice';

const jobReducers = combineReducers({
	jobSlice,
	jobListSlice
});

export default jobReducers;
