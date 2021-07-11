import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api';
import { showMessage } from 'app/store/vin/messageSlice';

export const getMail = createAsyncThunk(
	'mailApp/mail/getMail',
	async params => {
		const response = await API.get('/api/mail-app/mail', { params });
		const data = await response.data;
		return data;
	}
);

export const updateMail = createAsyncThunk(
	'mailApp/mail/updateMail',
	async (_data, { getState, dispatch }) => {
		const { id } = getState().mailApp.mail;

		const response = await API.post('/api/mail-app/update-mail', {
			id,
			..._data
		});
		const data = await response.data;

		dispatch(showMessage({ message: 'Mail Saved' }));

		return data;
	}
);

const mailSlice = createSlice({
	name: 'mailApp/mail',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getMail.fulfilled]: (state, action) => action.payload,
		[updateMail.fulfilled]: (state, action) => ({
			...state,
			...action.payload
		})
	}
});

export default mailSlice.reducer;
