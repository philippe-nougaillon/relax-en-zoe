import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';


// action types

const SPEED_UP = 'SPEED_UP';
const SPEED_DOWN = 'SPEED_DOWN';

const TEMP_UP = 'TEMP_UP';
const TEMP_DOWN = 'TEMP_DOWN';


// reducers

const params = {
    charge: 100,
    speed: 80,
    temp: 20,
    autonomie: 292,
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
    const speed = action.params.speed + 10;
    const autonomie = calculate(action.params.charge, speed, action.params.temp);

    if (autonomie)
        return {...state, speed, autonomie};
    else
        return state;
}

function applySpeedDOWN(state, action) {
    const speed = action.params.speed - 10;
    const autonomie = calculate(action.params.charge, speed, action.params.temp);

    if (autonomie)
        return {...state, speed, autonomie};
    else
        return state;
}

function applyTempUP(state, action) {
    const temp = action.params.temp + 10;
    const autonomie = calculate(action.params.charge, action.params.speed, temp);

    if (autonomie)
        return {...state, temp, autonomie};
    else
        return state;
}

function applyTempDOWN(state, action) {
    const temp = action.params.temp - 10;
    const autonomie = calculate(action.params.charge, action.params.speed, temp);

    if (autonomie)
        return {...state, temp, autonomie};
    else
        return state;
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


// Calculations 
    
function calculate(charge, speed, temp) {

    const consommations = { '50': 5.35, '60': 6.83, '70': 8.83, '80': 11.12, '90': 13.82, '100': 17.75, '110': 22.22, '120': 27.33, '130': 32.7 };
    const températures  = { '40': -5, '30': -2.5, '20': 0, '10': 2.5, '0': 5, '-10': 7.5, '-20': 10};
    
    let autonomie = 0

    // Puissance restante
    const puissance = 41; // Batterie ZOE 4.0 (41kW)
    const battery   = puissance - (puissance * (100 - charge) / 100);

    // Consommation 
    const conso = consommations[speed];
    autonomie = battery * (speed / conso);

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


// View layer

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

class CustomButtonBox extends Component {
    render() {
        const { children, value, unit, onClickUP, onClickDOWN } = this.props;
        return (
            <h3>
                <small className="text-info">{ children }</small>
                <br /> 
                <div className="btn-group">
                    <CustomButton onClick={ onClickDOWN }>-</CustomButton>
                    <span style={{ padding: 10}}>
                        { value }
                        <small>{ unit }</small>
                    </span>
                    <CustomButton onClick={ onClickUP }>+</CustomButton>
                </div>
            </h3>
        )
    }
}

function TheApp({ params, onSpeedUP, onSpeedDOWN, onTempUP, onTempDOWN }) {
    const { speed, temp, autonomie } = params;
    return (
        <div className="card">
            <div className="card-header">
                <h1>
                    <small className="text-info">Autonomie</small>
                    <br />
                    { autonomie | 0 } km
                </h1>
            </div>
            <div className="card-body">
                <CustomButtonBox
                    value={ speed }
                    unit=" km/h"
                    onClickUP  ={ onSpeedUP }
                    onClickDOWN={ onSpeedDOWN }>
                    Vitesse
                </CustomButtonBox>
                
                <CustomButtonBox
                    value={ temp }
                    unit=" °C"
                    onClickUP  ={ onTempUP }
                    onClickDOWN={ onTempDOWN }>
                    Température
                </CustomButtonBox>
            </div>
            <div className="card-footer"></div>
        </div>
    );
}
    
function render() {
    ReactDOM.render(
        <TheApp
            params = { store.getState().paramsState }
            onSpeedUP   = { () => store.dispatch(doSpeedUP()) } 
            onSpeedDOWN = { () => store.dispatch(doSpeedDOWN()) }     
            
            onTempUP    = { () => store.dispatch(doTempUP()) } 
            onTempDOWN  = { () => store.dispatch(doTempDOWN()) } 
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
