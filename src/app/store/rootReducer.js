import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import common from './common';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		common,
		...asyncReducers
	});

	/*
		Reset the redux store when user logged out
	*/
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
