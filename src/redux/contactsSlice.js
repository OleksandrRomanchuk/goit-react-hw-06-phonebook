import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nanoid } from 'nanoid';
import { contactsInitialState } from 'initials/contactsInitialState';

const persistConfig = {
	key: 'contacts',
	storage,
};

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: contactsInitialState,
	reducers: {
		addContact: {
			reducer(state, action) {
				return { contacts: [...state.contacts, action.payload] };
			},

			prepare(contact) {
				return {
					payload: { ...contact, id: nanoid(8) },
				};
			},
		},

		deleteContact(state, action) {
			state.contacts = state.contacts.filter(({ id }) => id !== action.payload);
		},
	},
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = persistReducer(
	persistConfig,
	contactsSlice.reducer
);
