import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware, createStore } from 'redux';
//import { createLogger } from 'redux-logger';
//import './index.css';


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
    const speed = action.params.speed + 10;
    return speed;
}

function applySpeedDOWN(state, action) {
  const speed = action.params.speed - 10;
  return speed;
}


// action creators

function doSpeedUP() {
    return {
        type: SPEED_UP,
    };
}

function doSpeedDOWN() {
    return {
        type: SPEED_DOWN,
    };
}


// Logger

//const logger = createLogger();


// Store

//const rootReducer = combineReducers({
//    paramsReducer: paramsReducer
//});

//const store = createStore(paramsReducer);


// View layer

function TheApp() {
    return 
        <div>
          <h2>TOP</h2>
        </div>;
}


ReactDOM.render(
    <TheApp />,
    document.getElementById('root')
);

//store.subscribe(render);
//render();
