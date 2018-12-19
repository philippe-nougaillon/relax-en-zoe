import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
//import './index.css';
//import * as serviceWorker from './serviceWorker';


// action types

const SPEED_UP = 'SPEED_UP';
const SPEED_DOWN = 'SPEED_DOWN';


// reducers

const params = {
    speed: 90,
    autonomie: 300,
};

function paramsReducer(state = params, action) {
    switch(action.type) {
        case SPEED_UP: {
            return applySpeedUP(state, action);
        }
        case SPEED_DOWN: {
            return applySpeedDOWN(state, action);
        }
        default: return state;
    }
}

function applySpeedUP(state, action) {
    const newspeed = action.params.speed + 10;
    return {...state, speed: newspeed};
}

function applySpeedDOWN(state, action) {
    const newspeed = action.params.speed - 10;
    return {...state, speed: newspeed};
}


// action creators

function doSpeedUP(params) {
    return {
        type: SPEED_UP,
        params,
    };
}

function doSpeedDOWN(params) {
    return {
        type: SPEED_DOWN,
        params,
    };
}


// Logger

const logger = createLogger();


// Store

const rootReducer = combineReducers({
    paramsState: paramsReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(logger),
);


// View layer

function TheApp({ params, onSpeedDOWN, onSpeedUP }) {
    const { speed, autonomie } = params;
    return (
        <div>
          <h1>{ autonomie }</h1>

          <button onClick={ () => onSpeedDOWN() }>-</button>
          <h4>{ speed }</h4>
          <button onClick={ () => onSpeedUP() }>+</button>
        </div>
    );
}

function render() {
    ReactDOM.render(
        <TheApp
            params = { store.getState().paramsState }
            onSpeedDOWN = { () => store.dispatch(doSpeedDOWN(store.getState().paramsState)) }     
            onSpeedUP   = { () => store.dispatch(doSpeedUP(store.getState().paramsState)) }     
        />,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
