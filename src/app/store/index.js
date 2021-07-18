import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './rootReducer';
import rootSaga from './rootSaga';

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

// Config Saga to store middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [
	...getDefaultMiddleware({
		thunk: true,
		immutableCheck: false,
		serializableCheck: false
	}),
	sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require(`redux-logger`);
	const logger = createLogger({
		collapsed: (getState, action, logEntry) => !logEntry.error
	});

	middleware.push(logger);
}

const store = configureStore({
	reducer: createReducer(),
	middleware,
	devTools: process.env.NODE_ENV === 'development'
});

sagaMiddleware.run(rootSaga);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(store.asyncReducers));
	return store;
};

export default store;
