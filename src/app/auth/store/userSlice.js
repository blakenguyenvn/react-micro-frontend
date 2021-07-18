/* eslint import/no-extraneous-dependencies: off*/
import { createSlice } from '@reduxjs/toolkit';
import 'firebase/auth';
import history from '@history';
import _ from '@lodash';
import {
	setInitialSettings,
	setDefaultSettings
} from 'app/store/common/settingsSlice';
import { showMessage } from 'app/store/common/messageSlice';
import oauth2Service from 'app/services/oauth2Service';

export const setUserData = user => async (dispatch, getState) => {
	/*
        You can redirect the logged-in user to a specific route depending on his role
    */
	history.location.state = {
		redirectUrl: user.redirectUrl
	};

	/*
    Set User Settings
     */
	dispatch(setDefaultSettings(user));

	dispatch(setUser(user));
};

export const updateUserSettings = settings => async (dispatch, getState) => {
	const oldUser = getState().auth.user;
	const user = _.merge({}, oldUser, { data: { settings } });

	return dispatch(setUserData(user));
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
	const { user } = getState().auth;
	const newUser = {
		...user,
		data: {
			...user.data,
			shortcuts
		}
	};

	return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/'
	});

	oauth2Service.disconnect();

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};

const initialState = {
	role: [], // guest
	data: {
		displayName: '',
		photoURL: '',
		email: '',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
