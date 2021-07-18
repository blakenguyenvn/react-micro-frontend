import { createSlice } from '@reduxjs/toolkit';
import oauth2Service from 'app/services/oauth2Service';
import { setUserData } from './userSlice';

export const oauthLogin =
	({ email }) =>
	async dispatch => {
		return oauth2Service
			.connect({ email })
			.then(user => {
				dispatch(setUserData(user));

				return dispatch(loginSuccess());
			})
			.catch(errors => {
				return dispatch(loginError(errors));
			});
	};

const initialState = {
	success: false,
	errors: [],
	oauthDialog: {
		type: 'connect',
		props: {
			open: false
		},
		data: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		loginError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		},
		openOauthDialog: (state, action) => {
			state.oauthDialog = {
				type: 'connect',
				props: {
					open: true
				},
				data: null
			};
		},
		closeOauthDialog: (state, action) => {
			state.contactDialog = {
				type: 'connect',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError, openOauthDialog, closeOauthDialog } =
	loginSlice.actions;

export default loginSlice.reducer;
