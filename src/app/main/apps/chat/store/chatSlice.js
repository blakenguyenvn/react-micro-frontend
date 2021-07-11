import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api';
import { setSelectedContactId } from './contactsSlice';
import { closeMobileChatsSidebar } from './sidebarsSlice';
import { updateUserChatList } from './userSlice';

export const getChat = createAsyncThunk(
	'chatApp/chat/getChat',
	async ({ contactId, isMobile }, { dispatch, getState }) => {
		const { id: userId } = getState().chatApp.user;

		const response = await API.get('/api/chat/get-chat', {
			params: {
				contactId,
				userId
			}
		});
		const { chat, userChatList } = await response.data;

		dispatch(setSelectedContactId(contactId));
		dispatch(updateUserChatList(userChatList));

		if (isMobile) {
			dispatch(closeMobileChatsSidebar());
		}

		return chat;
	}
);

export const sendMessage = createAsyncThunk(
	'chatApp/chat/sendMessage',
	async ({ messageText, chatId, contactId }, { dispatch, getState }) => {
		const response = await API.post('/api/chat/send-message', {
			chatId,
			messageText,
			contactId
		});

		const { message, userChatList } = await response.data;

		dispatch(updateUserChatList(userChatList));

		return message;
	}
);

const chatSlice = createSlice({
	name: 'chatApp/chat',
	initialState: null,
	reducers: {
		removeChat: (state, action) => action.payload
	},
	extraReducers: {
		[getChat.fulfilled]: (state, action) => action.payload,
		[sendMessage.fulfilled]: (state, action) => {
			state.dialog = [...state.dialog, action.payload];
		}
	}
});

export default chatSlice.reducer;
