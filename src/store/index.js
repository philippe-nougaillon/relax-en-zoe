import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import paramsReducer from '../reducers/params';


// Reducer

const rootReducer = combineReducers({
    paramsState: paramsReducer,
});


// Logger

const logger = createLogger();

// Store

const store = createStore(
    rootReducer,
    applyMiddleware(logger),
);

export default store;