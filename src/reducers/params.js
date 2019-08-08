import { SPEED_UP, 
        SPEED_DOWN, 
        TEMP_UP, 
        TEMP_DOWN, 
        HEATER_SWITCH, 
        POWER_UP, 
        POWER_DOWN, 
        TIME_UP, 
        TIME_DOWN } from '../constants/actionTypes';

// initial states

const params = {
        autonomie: 292,
        speed:  80,
        temp:   20,
        heater: false,
        power: 22,
        minutes: 60,
        charge: 40,
        consommation: 11.12,
};

// reducers
// AUTONOMIE

function applySpeedUP(state, action) {
    const speed = state.speed + 10;
    const results = calculate(speed, state.temp, state.heater);
    const autonomie = results['autonomie']
    const consommation = results['consommation']

    if (autonomie)
        return {...state, speed, autonomie, consommation};
    else
        return state;
}

function applySpeedDOWN(state, action) {
    const speed = state.speed - 10;
    const results = calculate(speed, state.temp, state.heater);
    const autonomie = results['autonomie']
    const consommation = results['consommation']

    if (autonomie)
        return {...state, speed, autonomie, consommation};
    else
        return state;
}

function applyTempUP(state, action) {
    const temp = state.temp + 10;
    let heater = state.heater;

    const results = calculate(state.speed, temp, heater);
    const autonomie = results['autonomie']
    const consommation = results['consommation']

    // Allumer le chauffage ?     
    heater = (temp <= 10);

    if (autonomie)
        return {...state, temp, autonomie, heater, consommation};
    else
        return state;
}

function applyTempDOWN(state, action) {
    const temp = state.temp - 10;
    let heater = state.heater;

    const results = calculate(state.speed, temp, heater);
    const autonomie = results['autonomie']
    const consommation = results['consommation']

    heater = (temp <= 10);

    if (autonomie)
        return {...state, temp, autonomie, heater, consommation};
    else
        return state;
}

function applyHeaterSWITCH(state, action) {

    const heater = !state.heater;
    const results = calculate(state.speed, state.temp, heater);
    const autonomie = results['autonomie']
    const consommation = results['consommation']

    return {...state, heater, autonomie, consommation};
}

// CHARGE 

function applyPowerUP(state, action) {

    const power = state.power + 1;
    const charge = calculate_charge(power, state.minutes);

    if (charge)
        return {...state, power, charge}
    else   
        return state;
}

function applyPowerDOWN(state, action) {

    const power = state.power - 1;
    const charge = calculate_charge(power, state.minutes);

    if (charge)
        return {...state, power, charge}
    else   
        return state;
}

function applyTimeUP(state, action) {

    const minutes = state.minutes + 10;
    const charge = calculate_charge(state.power, minutes);

    if (charge)
        return {...state, minutes, charge};
    else   
        return state;
}

function applyTimeDOWN(state, action) {

    const minutes = state.minutes - 10;
    const charge = calculate_charge(state.power, minutes);

    if (charge)
        return {...state, minutes, charge};
    else   
        return state;
}


// Calculations 
    
function calculate(speed, temp, heater) {

    const consommations = { '50': 5.35, '60': 6.83, '70': 8.83, '80': 11.12, '90': 13.82, '100': 17.75, '110': 22.22, '120': 27.33, '130': 32.7 };
    const températures  = { '40': -5, '30': -2.5, '20': 0, '10': 2.5, '0': 10, '-10': 20};
    const heatercosts   = { '10': 3, '0': 5, '-10': 10 };

    let results = {'autonomie': 0, 'consommation': 0};
    let autonomie = 0;
    let conso = 0

    const charge = 100; // La batterie est pleine !

    // Puissance restante
    const puissance = 41; // Batterie ZOE 4.0 (41kW)
    const battery   = puissance - (puissance * (100 - charge) / 100);

    // Consommation 
    conso = consommations[speed];
    autonomie = battery * (speed / conso);

    // Impact de la température extérieure
    const impact = températures[temp];
    autonomie = autonomie - (autonomie * impact / 100); 

    // Impact du chauffage
    if (heater && temp <= 10) {
        const heatercost = heatercosts[temp];
        autonomie = autonomie - (autonomie * heatercost / 100);
        conso = conso + (conso * heatercost / 100); 
    }

    results['autonomie']= autonomie;
    results['consommation']= conso;

    return results;
}

function calculate_charge(power, minutes) {

    // Batterie de la ZOE 4.0 2018 = 43 kW
    const battery = 43;

    // on calcule la puissance délivrée par minute * temps passé en charge
    const puissance_delivrée = (((power * 1000)/60) * minutes) / 1000;

    // on perd 20 % environ de la puissance délivrée par la prise... 
    const puissance_accumulée = puissance_delivrée - ((puissance_delivrée * 20) / 100);

    const charge = Math.round((puissance_accumulée / battery) * 100);

    if (charge <= 100)
        return (charge)
    else
        return null;
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
        case POWER_UP: {
            return applyPowerUP(state, action);
        }
        case POWER_DOWN: {
            return applyPowerDOWN(state, action);
        }
        case TIME_UP: {
            return applyTimeUP(state, action);
        }
        case TIME_DOWN: {
            return applyTimeDOWN(state, action);
        }
        default: return state;
    }
}

export default paramsReducer;