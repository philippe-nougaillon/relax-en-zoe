import { HEATER_SWITCH } from '../constants/actionTypes';

const doHeaterSWITCH = params => ({
        type: HEATER_SWITCH,
        params,
});

export { 
    doHeaterSWITCH,
};
