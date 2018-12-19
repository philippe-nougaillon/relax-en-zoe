import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import * as serviceWorker from './serviceWorker';


// action types

const SPEED_UP = 'SPEED_UP';
const SPEED_DOWN = 'SPEED_DOWN';

const TEMP_UP = 'TEMP_UP';
const TEMP_DOWN = 'TEMP_DOWN';

// reducers

const params = {
    speed: 90,
    autonomie: 253,
    temp: 0,
};

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
        default: return state;
    }
}

function applySpeedUP(state, action) {
    const newSpeed = action.params.speed + 10;
    const newAutonomie = calculate(100, newSpeed, 0);

    if (newAutonomie)
        return {...state, speed: newSpeed, autonomie: newAutonomie};
    else
        return state;
}

function applySpeedDOWN(state, action) {
    const newSpeed = action.params.speed - 10;
    const newAutonomie = calculate(100, newSpeed, 0);

    if (newAutonomie)
        return {...state, speed: newSpeed, autonomie: newAutonomie};
    else
        return state;
}

function applyTempUP(state, action) {
    const newTemp = action.params.temp + 10;
    const newAutonomie = calculate(100, action.params.speed, newTemp);

    if (newAutonomie)
        return {...state, temp: newTemp, autonomie: newAutonomie};
    else
        return state;
}

function applyTempDOWN(state, action) {
    const newTemp = action.params.temp - 10;
    const newAutonomie = calculate(100, action.params.speed, newTemp);

    if (newAutonomie)
        return {...state, temp: newTemp, autonomie: newAutonomie};
    else
        return state;
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

function doTempUP(params) {
    return {
        type: TEMP_UP,
        params,
    };
}

function doTempDOWN(params) {
    return {
        type: TEMP_DOWN,
        params,
    };
}


// Calculations 
    
function calculate(charge, speed, temp) {

    const consommations = { '50': 5.35, '60': 6.83, '70': 8.83, '80': 11.12, '90': 13.82, '100': 17.75, '110': 22.22, '120': 27.33, '130': 32.7 };
    const températures  = { '30': -2.5, '20': 0, '10': 2.5, '0': 5, '-10': 7.5, '-20': 10};
    
    // Puissance restante
    const puissance = 41; // Batterie ZOE 4.0 (41kW)
    const battery   = puissance - (puissance * (100 - charge) / 100);

    // Consommation 
    const conso = consommations[speed];
    let autonomie = battery * (parseInt(speed) / conso);

    // Impact de la température extérieure
    const impact = températures[temp];
    autonomie  = autonomie - (autonomie * impact / 100); 

    //console.log("Charge:" + charge, "% | Speed:" + speed + " | Temp:" + temp + "° | Autonomie:" + autonomie);

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

class CustomButton extends Component {
    render() {
        const { children, onClick } = this.props; 
        return (
            <button
                type="button"
                className="btn btn-outline-info"
                onClick={ onClick }>
                { children }
            </button>
        ); 
    }
}


// View layer

function TheApp({ params, onSpeedDOWN, onSpeedUP, onTempDOWN, onTempUP }) {
    const { speed, temp, autonomie } = params;
    return (
        <div className="card">
            <div class="card-header">
                <h1>
                    <small>Autonomie</small>
                    <br />
                    { autonomie | 0 } km
                </h1>
            </div>
            <div className="card-body">
                <h3>
                    <small>Vitesse</small>
                    <br /> 
                    <CustomButton onClick={ () => onSpeedDOWN() }>-</CustomButton>
                    { speed }
                    <CustomButton onClick={ () => onSpeedUP() }>+</CustomButton>
                </h3>

                <br />
                <h3>
                    <small>Température</small>
                    <br />
                    <CustomButton onClick={ () => onTempDOWN() }>-</CustomButton>
                    { temp }°
                    <CustomButton onClick={ () => onTempUP() }>+</CustomButton>
                </h3>
            </div>
        </div>
    );
}
    
function render() {
    ReactDOM.render(
        <TheApp
            params = { store.getState().paramsState }
            onSpeedDOWN = { () => store.dispatch(doSpeedDOWN(store.getState().paramsState)) }     
            onSpeedUP   = { () => store.dispatch(doSpeedUP(store.getState().paramsState)) } 
            
            onTempUP    = { () => store.dispatch(doTempUP(store.getState().paramsState)) } 
            onTempDOWN  = { () => store.dispatch(doTempDOWN(store.getState().paramsState)) } 
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
