import { SPEED_UP, SPEED_DOWN, TEMP_UP, TEMP_DOWN, HEATER_SWITCH } from '../constants/actionTypes';

// initial states

const params = {
    charge: 100,
    speed:  80,
    temp:   20,
    heater: false,
    autonomie: 292,
};

// reducers

function applySpeedUP(state, action) {
    const speed = state.speed + 10;
    const autonomie = calculate(state.charge, speed, state.temp, state.heater);

    if (autonomie)
        return {...state, speed, autonomie};
    else
        return state;
}

function applySpeedDOWN(state, action) {
    const speed = state.speed - 10;
    const autonomie = calculate(state.charge, speed, state.temp, state.heater);

    if (autonomie)
        return {...state, speed, autonomie};
    else
        return state;
}

function applyTempUP(state, action) {
    const temp = state.temp + 10;
    let heater = state.heater;

    // Allumer le chauffage dès que ça caille un peu    
    heater = (temp <= 10);

    const autonomie = calculate(state.charge, state.speed, temp, heater);

    if (autonomie)
        return {...state, temp, autonomie, heater};
    else
        return state;
}

function applyTempDOWN(state, action) {
    const temp = state.temp - 10;
    let heater = state.heater;

    // Forcer le chauffage si ça caille J    
    heater = (temp <= 10);

    const autonomie = calculate(state.charge, state.speed, temp, heater);

    if (autonomie)
        return {...state, temp, autonomie, heater};
    else
        return state;
}

function applyHeaterSWITCH(state, action) {

    const heater = !state.heater;
    const autonomie = calculate(state.charge, state.speed, state.temp, heater);

    return {...state, heater, autonomie};
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



// dispatch reducers

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

export default paramsReducer;