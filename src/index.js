import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App'; 


// action types

const SPEED_UP = 'SPEED_UP';
const SPEED_DOWN = 'SPEED_DOWN';

const TEMP_UP = 'TEMP_UP';
const TEMP_DOWN = 'TEMP_DOWN';

const HEATER_SWITCH = 'HEATER_SWITCH';


// initial states

const params = {
    charge: 100,
    speed:  80,
    temp:   20,
    heater: false,
    autonomie: 292,
};

// reducer

function paramsReducer(state = params, action) {
    switch(action.type) {
        case SPEED_UP: {
            return applySpeedUP(state, action);
        }
        case SPEED_DOWN: {
            return applySpeedDOWN(state, action);
        }
        case TEMP_UP: {
            return applyTempUP(state, action);
        }
        case TEMP_DOWN: {
            return applyTempDOWN(state, action);
        }
        case HEATER_SWITCH: {
            return applyHeaterSWITCH(state, action);
        }
        default: return state;
    }
}

function applySpeedUP(state, action) {
    const speed = action.params.speed + 10;
    const autonomie = calculate(action.params.charge, speed, action.params.temp, action.params.heater);

    if (autonomie)
        return {...state, speed, autonomie};
    else
        return state;
}

function applySpeedDOWN(state, action) {
    const speed = action.params.speed - 10;
    const autonomie = calculate(action.params.charge, speed, action.params.temp, action.params.heater);

    if (autonomie)
        return {...state, speed, autonomie};
    else
        return state;
}

function applyTempUP(state, action) {
    const temp = action.params.temp + 10;
    let heater = action.params.heater;

    // Allumer le chauffage dès que ça caille un peu    
    heater = (temp <= 10);

    const autonomie = calculate(action.params.charge, action.params.speed, temp, heater);

    if (autonomie)
        return {...state, temp, autonomie, heater};
    else
        return state;
}

function applyTempDOWN(state, action) {
    const temp = action.params.temp - 10;
    let heater = action.params.heater;

    // Forcer le chauffage si ça caille J    
    heater = (temp <= 10);

    const autonomie = calculate(action.params.charge, action.params.speed, temp, heater);

    if (autonomie)
        return {...state, temp, autonomie, heater};
    else
        return state;
}

function applyHeaterSWITCH(state, action) {

    const heater = !action.params.heater;
    const autonomie = calculate(action.params.charge, action.params.speed, action.params.temp, heater);

    return {...state, heater, autonomie};
}

// action creators

function doSpeedUP() {
    return {
        type: SPEED_UP,
        params: store.getState().paramsState,
    };
}

function doSpeedDOWN() {
    return {
        type: SPEED_DOWN,
        params: store.getState().paramsState,
    };
}

function doTempUP() {
    return {
        type: TEMP_UP,
        params: store.getState().paramsState,
    };
}

function doTempDOWN() {
    return {
        type: TEMP_DOWN,
        params: store.getState().paramsState,
    };
}

function doHeaterSWITCH() {
    return {
        type: HEATER_SWITCH,
        params: store.getState().paramsState,
    };
}

// Calculations 
    
function calculate(charge, speed, temp, heater) {

    const consommations = { '50': 5.35, '60': 6.83, '70': 8.83, '80': 11.12, '90': 13.82, '100': 17.75, '110': 22.22, '120': 27.33, '130': 32.7 };
    const températures  = { '40': -5, '30': -2.5, '20': 0, '10': 2.5, '0': 10, '-10': 20};
    const heatercosts   = { '10': 3, '0': 5, '-10': 10 };

    let autonomie = 0

    // Puissance restante
    const puissance = 41; // Batterie ZOE 4.0 (41kW)
    const battery   = puissance - (puissance * (100 - charge) / 100);

    // Consommation 
    const conso = consommations[speed];
    autonomie = battery * (speed / conso);

    // Impact de la température extérieure
    const impact = températures[temp];
    autonomie = autonomie - (autonomie * impact / 100); 

    // Impact du chauffage
    if (heater && temp <= 10) {
        const heatercost = heatercosts[temp];
        autonomie = autonomie - (autonomie * heatercost / 100); 
    }

    return autonomie;
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

    
function render() {
    ReactDOM.render(
        <App
            params = { store.getState().paramsState }
            onSpeedUP   = { () => store.dispatch(doSpeedUP()) } 
            onSpeedDOWN = { () => store.dispatch(doSpeedDOWN()) }     
            
            onTempUP    = { () => store.dispatch(doTempUP()) } 
            onTempDOWN  = { () => store.dispatch(doTempDOWN()) } 

            onHeaterSWITCH  = { () => store.dispatch(doHeaterSWITCH()) }
        />,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
